import { Box, VStack, Heading, Button, Text } from "@chakra-ui/react";
import type { ProductFilters } from "../types/product";
// import { ProductFilters } from "../../types/product";

interface SidebarProps {
  filters: ProductFilters;
  categories: string[];
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
  totalProducts: number;
  filteredCount: number;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  filters,
  categories,
  onFiltersChange,
  onClearFilters,
  totalProducts,
  filteredCount,
  onMobileClose,
}) => {
  const sidebarBg = "#1F2937";
  const borderColor = "#374151";

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category,
    });
    // Close mobile sidebar after selection
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy: sortBy as ProductFilters["sortBy"],
    });
    // Close mobile sidebar after selection
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const handleClearFiltersClick = () => {
    onClearFilters();
    // Close mobile sidebar after clearing
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <Box
      bg={sidebarBg}
      borderRight="1px"
      borderColor={borderColor}
      p="6"
      minW="320px"
      maxW="320px"
      height="fit-content"
      position="sticky"
      top="120px"
      borderRadius="16px"
      overflowY="auto"
      css={{
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#374151",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#6B7280",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#9CA3AF",
        },
      }}
    >
      <VStack align="stretch" gap="8">
        <Box>
          <Heading size="lg" color="#F9FAFB" mb="3" fontWeight="700">
            Filters
          </Heading>
          <Text
            fontSize="sm"
            color="#9CA3AF"
            fontWeight="500"
            bg="#374151"
            px="3"
            py="2"
            borderRadius="8px"
          >
            {filteredCount} of {totalProducts} products
          </Text>
        </Box>

        <Box
          height="2px"
          bg="linear-gradient(90deg, #374151, #4B5563, #374151)"
          borderRadius="1px"
        />

        <Box>
          <Heading size="md" color="#F9FAFB" mb="4" fontWeight="600">
            Category
          </Heading>
          <select
            value={filters.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleCategoryChange(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "10px",
              borderColor: "#4B5563",
              borderWidth: "2px",
              width: "100%",
              backgroundColor: "#374151",
              fontSize: "16px",
              fontWeight: "500",
              color: "#F9FAFB",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </Box>

        <Box
          height="2px"
          bg="linear-gradient(90deg, #374151, #4B5563, #374151)"
          borderRadius="1px"
        />

        <Box>
          <Heading size="md" color="#F9FAFB" mb="4" fontWeight="600">
            Sort By
          </Heading>
          <select
            value={filters.sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleSortChange(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "10px",
              borderColor: "#4B5563",
              borderWidth: "2px",
              width: "100%",
              backgroundColor: "#374151",
              fontSize: "16px",
              fontWeight: "500",
              color: "#F9FAFB",
            }}
          >
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </Box>

        <Box
          height="2px"
          bg="linear-gradient(90deg, #374151, #4B5563, #374151)"
          borderRadius="1px"
        />

        <Button
          onClick={handleClearFiltersClick}
          variant="outline"
          bg="#374151"
          color="#EF4444"
          borderColor="#4B5563"
          size="md"
          borderRadius="10px"
          fontWeight="600"
          _hover={{
            bg: "#4B5563",
            borderColor: "#6B7280",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
          }}
        >
          Clear All Filters
        </Button>
      </VStack>
    </Box>
  );
};
