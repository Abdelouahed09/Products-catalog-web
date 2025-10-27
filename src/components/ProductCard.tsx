import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onViewDetails?: (product: Product) => void;
}

const MotionBox = motion.create(Box);

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardBg = "#1F2937";
  const borderColor = "#374151";
  const favoriteColor = isFavorite ? "#EF4444" : "#6B7280";

  const handleImageError = () => {
    setImageError(true);
  };

  const cardVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    },
    hover: {
      scale: 1.02,
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
    },
    tap: {
      scale: 0.98,
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const favoriteVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <MotionBox
      bg={cardBg}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="16px"
      overflow="hidden"
      height="100%"
      display="flex"
      flexDirection="column"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      cursor="pointer"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Box
        position="relative"
        height={{ base: "200px", sm: "220px", md: "240px" }}
        overflow="hidden"
      >
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          style={{ width: "100%", height: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={imageError ? "/placeholder-product.png" : product.image}
            alt={product.title}
            width="100%"
            height="100%"
            objectFit="cover"
            onError={handleImageError}
            borderRadius="16px 16px 0 0"
          />
        </motion.div>

        <motion.div
          variants={favoriteVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
          }}
          transition={{ duration: 0.2 }}
        >
          <IconButton
            aria-label="Toggle favorite"
            bg="rgba(31, 41, 55, 0.95)"
            color={favoriteColor}
            size="sm"
            borderRadius="full"
            onClick={() => onToggleFavorite(product.id)}
            _hover={{
              bg: "rgba(31, 41, 55, 1)",
              color: isFavorite ? "#EF4444" : "#3B82F6",
            }}
            backdropFilter="blur(10px)"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.4)"
          >
            <Heart
              size={18}
              fill={isFavorite ? favoriteColor : "none"}
              strokeWidth={isFavorite ? 0 : 2}
            />
          </IconButton>
        </motion.div>
      </Box>

      <Box flex="1" p={{ base: "4", sm: "5" }}>
        <VStack align="stretch" gap={{ base: "3", sm: "4" }} height="100%">
          <Badge
            bg="#1E40AF"
            color="#E0E7FF"
            variant="subtle"
            alignSelf="flex-start"
            borderRadius="20px"
            px="4"
            py="2"
            fontSize={{ base: "xs", sm: "sm" }}
            fontWeight="medium"
            textTransform="uppercase"
            letterSpacing="0.5px"
          >
            {product.category}
          </Badge>

          <Text
            fontSize={{ base: "md", sm: "lg" }}
            fontWeight="600"
            color="#F9FAFB"
            lineHeight="1.5"
            flex="1"
            overflow="hidden"
            textOverflow="ellipsis"
            display="-webkit-box"
            style={{
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.title}
          </Text>

          <HStack justify="space-between" align="center">
            <Text
              fontSize={{ base: "xl", sm: "2xl" }}
              fontWeight="700"
              color="#60A5FA"
            >
              ${product.price.toFixed(2)}
            </Text>
            <HStack gap="1" align="center">
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text
                fontSize={{ base: "xs", sm: "sm" }}
                color="#9CA3AF"
                fontWeight="500"
              >
                {product.rating.rate}
              </Text>
              <Text fontSize="xs" color="#6B7280">
                ({product.rating.count})
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>

      <Box p={{ base: "4", sm: "5" }} pt="0">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            bg="#3B82F6"
            color="#FFFFFF"
            variant="solid"
            size={{ base: "sm", sm: "md" }}
            width="100%"
            borderRadius="12px"
            fontWeight="600"
            fontSize={{ base: "xs", sm: "sm" }}
            onClick={() => onViewDetails?.(product)}
            _hover={{
              bg: "#2563EB",
              transform: "translateY(-1px)",
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
            }}
            _active={{
              bg: "#1D4ED8",
              transform: "translateY(0px)",
            }}
            transition="all 0.2s ease"
            boxShadow="0 4px 12px rgba(59, 130, 246, 0.3)"
          >
            View Details
          </Button>
        </motion.div>
      </Box>
    </MotionBox>
  );
};
