import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Flex,
  Grid,
  Text,
  Spinner,
  useBreakpointValue,
  IconButton,
  Image,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import type {
  ProductFilters,
  PaginationState,
  Product,
} from "../types/product";
import { productService } from "../services/productService";
import { ProductCard } from "../components/ProductCard";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 12;

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);
const MotionFlex = motion.create(Flex);

export const ProductCatalog: React.FC = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    category: "",
    search: "",
    sortBy: "title-asc",
  });
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // Fetch products
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters]);

  // Update pagination when filtered products change
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredAndSortedProducts.length,
      page: 1, // Reset to first page when filters change
    }));
  }, [filteredAndSortedProducts]);

  // Get products for current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, pagination.page, pagination.limit]);

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handleToggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: "",
      search: "",
      sortBy: "title-asc",
    });
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    // Scroll to top of page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const pageBg = "#111827";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  if (error) {
    return (
      <MotionBox
        p="8"
        bg="#1F2937"
        borderRadius="12px"
        border="1px"
        borderColor="#374151"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Text color="#EF4444" fontWeight="600" fontSize="lg">
          Failed to load products. Please try again later.
        </Text>
      </MotionBox>
    );
  }

  const sidebarContent = (
    <Sidebar
      filters={filters}
      categories={categories}
      onFiltersChange={handleFiltersChange}
      onClearFilters={handleClearFilters}
      totalProducts={products.length}
      filteredCount={filteredAndSortedProducts.length}
      onMobileClose={() => setIsDrawerOpen(false)}
    />
  );

  return (
    <MotionBox
      bg={pageBg}
      minH="100vh"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Navbar
        searchQuery={filters.search}
        onSearchChange={(search) => setFilters((prev) => ({ ...prev, search }))}
        onSidebarToggle={() => setIsDrawerOpen(true)}
      />

      <MotionFlex
        // maxW="1200px"
        // mx="auto"
        px={{ base: "4", sm: "6", md: "16" }}
        py={{ base: "4", md: "6" }}
        variants={itemVariants}
      >
        {/* Desktop Sidebar */}
        {!isMobile && sidebarContent}

        {/* Mobile Drawer */}
        {isMobile && (
          <>
            <AnimatePresence>
              {isDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 30,
                    backdropFilter: "blur(8px)",
                  }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <motion.div
                    initial={{ x: -320 }}
                    animate={{ x: 0 }}
                    exit={{ x: -320 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "320px",
                      backgroundColor: "#1F2937",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Box
                      p="6"
                      borderBottom="1px"
                      borderColor="#374151"
                      bg="#111827"
                    >
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="700" fontSize="lg" color="#F9FAFB">
                          Filters
                        </Text>
                        <IconButton
                          aria-label="Close filters"
                          size="md"
                          variant="ghost"
                          onClick={() => setIsDrawerOpen(false)}
                          borderRadius="8px"
                          color="#9CA3AF"
                          _hover={{ bg: "#374151" }}
                        >
                          ×
                        </IconButton>
                      </Flex>
                    </Box>
                    <Box p="0">{sidebarContent}</Box>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Main Content */}
        <MotionBox
          flex="1"
          ml={!isMobile ? "6" : "0"}
          variants={itemVariants}
          minH="400px"
        >
          {isLoading ? (
            <MotionFlex
              justify="center"
              align="center"
              minH="500px"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Spinner size="xl" color="#3B82F6" />
            </MotionFlex>
          ) : (
            <>
              <Box fontSize="lg" color="#9CA3AF" mb="6" fontWeight="500">
                Showing {paginatedProducts.length} of{" "}
                {filteredAndSortedProducts.length} products
              </Box>

              <AnimatePresence>
                <MotionGrid
                  id="products-grid"
                  key={`${pagination.page}-${filters.category}-${filters.search}-${filters.sortBy}`}
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={{ base: "6", sm: "5", md: "6", lg: "6" }}
                  mb="6"
                  px={{ base: "2", sm: "0" }}
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.has(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </MotionGrid>
              </AnimatePresence>

              {paginatedProducts.length === 0 && !isLoading && (
                <MotionBox
                  textAlign="center"
                  py="16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Text fontSize="xl" color="#9CA3AF" fontWeight="500">
                    No products found matching your criteria.
                  </Text>
                </MotionBox>
              )}

              <Pagination
                currentPage={pagination.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </>
          )}
        </MotionBox>
      </MotionFlex>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 50,
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: "#1F2937",
                borderRadius: "24px",
                maxWidth: "900px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                p={{ base: "4", md: "6" }}
                borderBottom="1px solid #374151"
                bg="#111827"
              >
                <Flex justify="space-between" align="center">
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="700"
                    color="#F9FAFB"
                  >
                    Product Details
                  </Text>
                  <IconButton
                    aria-label="Close modal"
                    onClick={handleCloseModal}
                    bg="transparent"
                    color="#9CA3AF"
                    _hover={{ bg: "#374151", color: "#F9FAFB" }}
                    size="md"
                    borderRadius="8px"
                  >
                    <Text fontSize="24px">×</Text>
                  </IconButton>
                </Flex>
              </Box>

              <Box
                p={{ base: "4", md: "6" }}
                overflowY="auto"
                maxH="calc(90vh - 80px)"
              >
                <VStack gap="6" align="stretch">
                  {/* Product Image */}
                  <Box
                    width="100%"
                    height={{ base: "250px", md: "350px" }}
                    borderRadius="16px"
                    overflow="hidden"
                    bg="#111827"
                    border="1px solid #374151"
                    position="relative"
                  >
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      width="100%"
                      height="100%"
                      objectFit="contain"
                    />
                  </Box>

                  {/* Category Badge */}
                  <Badge
                    bg="#1E40AF"
                    color="#E0E7FF"
                    alignSelf="flex-start"
                    borderRadius="20px"
                    px="4"
                    py="2"
                    fontSize="sm"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                  >
                    {selectedProduct.category}
                  </Badge>

                  {/* Title */}
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="700"
                    color="#F9FAFB"
                    lineHeight="1.3"
                  >
                    {selectedProduct.title}
                  </Text>

                  {/* Price and Rating */}
                  <HStack gap="6" flexWrap="wrap">
                    <VStack align="start" gap="1">
                      <Text fontSize="sm" color="#9CA3AF" fontWeight="500">
                        Price
                      </Text>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="700"
                        color="#60A5FA"
                      >
                        ${selectedProduct.price.toFixed(2)}
                      </Text>
                    </VStack>
                    <VStack align="start" gap="1">
                      <Text fontSize="sm" color="#9CA3AF" fontWeight="500">
                        Rating
                      </Text>
                      <HStack gap="2" align="center">
                        <Star size={20} color="#F59E0B" fill="#F59E0B" />
                        <Text
                          fontSize={{ base: "lg", md: "xl" }}
                          fontWeight="600"
                          color="#F59E0B"
                        >
                          {selectedProduct.rating.rate}
                        </Text>
                        <Text fontSize="sm" color="#6B7280">
                          ({selectedProduct.rating.count} reviews)
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  {/* Divider */}
                  <Box height="2px" bg="#374151" borderRadius="1px" />

                  {/* Description */}
                  <VStack align="start" gap="2">
                    <Text
                      fontSize="md"
                      color="#9CA3AF"
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                    >
                      Description
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color="#D1D5DB"
                      lineHeight="1.7"
                      whiteSpace="pre-wrap"
                    >
                      {selectedProduct.description}
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionBox>
  );
};
