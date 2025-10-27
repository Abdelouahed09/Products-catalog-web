import { Box, Button, HStack, Text, Spinner, Center } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const buttonBg = "#1F2937";
  const activeBg = "#3B82F6";
  const borderColor = "#374151";

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      // Show all pages if total pages is 7 or less
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 0) {
    return null;
  }

  return (
    <Box mt="6" mb="4" display="flex" justifyContent="center">
      <HStack
        gap="3"
        bg="#1F2937"
        p="2"
        borderRadius="12px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
        border="1px"
        borderColor="#374151"
      >
        <Button
          size="md"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          bg={buttonBg}
          borderColor={borderColor}
          borderRadius="8px"
          fontWeight="500"
          color="#F9FAFB"
          _hover={{
            bg: "#374151",
            borderColor: "#3B82F6",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          <ChevronLeft size={16} style={{ marginRight: "8px" }} />
          Previous
        </Button>

        {getVisiblePages().map((page, index) => (
          <Box key={`page-${page}-${index}`}>
            {page === "..." ? (
              <Text px="3" py="2" color="#9CA3AF" fontWeight="500">
                ...
              </Text>
            ) : (
              <Button
                size="md"
                variant={currentPage === page ? "solid" : "outline"}
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                bg={currentPage === page ? activeBg : buttonBg}
                color={currentPage === page ? "#FFFFFF" : "#F9FAFB"}
                borderColor={borderColor}
                borderRadius="8px"
                fontWeight="600"
                minW="44px"
                _hover={{
                  bg: currentPage === page ? "#2563EB" : "#374151",
                  borderColor: "#3B82F6",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
                _disabled={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                }}
              >
                {page}
              </Button>
            )}
          </Box>
        ))}

        <Button
          size="md"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          bg={buttonBg}
          borderColor={borderColor}
          borderRadius="8px"
          fontWeight="500"
          color="#F9FAFB"
          _hover={{
            bg: "#374151",
            borderColor: "#3B82F6",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          Next
          <ChevronRight size={16} style={{ marginLeft: "8px" }} />
        </Button>
      </HStack>

      {isLoading && (
        <Box mt="4">
          <Center>
            <Spinner color="#3B82F6" size="md" />
          </Center>
        </Box>
      )}
    </Box>
  );
};
