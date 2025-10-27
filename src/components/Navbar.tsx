import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Search, Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSidebarToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onSidebarToggle,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    setIsSearchExpanded(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  return (
    <Box
      bg="#1F2937"
      borderBottom="1px solid #374151"
      px={{ base: "4", md: "16", lg: "18" }}
      py="3"
      position="sticky"
      top="0"
      zIndex="10"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
    >
      <Flex
        align="center"
        justify="space-between"
        // maxW="1200px"
        // mx="auto"
        gap="6"
        position="relative"
        minH="40px"
      >
        {/* Left Section - Menu Button (Mobile only) */}
        {isMobile && (
          <Button
            variant="ghost"
            onClick={onSidebarToggle}
            bg="transparent"
            color="#9CA3AF"
            _hover={{
              bg: "#374151",
              color: "#F9FAFB",
            }}
            p="2"
            borderRadius="8px"
            minW="auto"
            h="40px"
            opacity={isSearchExpanded ? 0 : 1}
            transform={isSearchExpanded ? "translateX(-20px)" : "translateX(0)"}
            transition="all 0.3s ease"
            pointerEvents={isSearchExpanded ? "none" : "auto"}
          >
            <Menu size={20} />
          </Button>
        )}

        {/* Left Section - Logo/Title (Desktop) or Center Section (Mobile) */}
        <Heading
          size="lg"
          color="#F9FAFB"
          fontWeight="600"
          letterSpacing="-0.025em"
          fontSize="24px"
          flex={isMobile ? "1" : "0"}
          textAlign={isMobile ? "center" : "left"}
          opacity={isSearchExpanded ? 0 : 1}
          transform={isSearchExpanded ? "translateY(-10px)" : "translateY(0)"}
          transition="all 0.3s ease"
          pointerEvents={isSearchExpanded ? "none" : "auto"}
        >
          <span style={{ color: "#3B82F6" }}>Product</span> Catalog
        </Heading>

        {/* Right Section - Search */}
        <Box position="relative" minW="40px">
          {isMobile ? (
            // Mobile: Icon behavior with expandable input
            <>
              {isSearchExpanded ? (
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onBlur={handleSearchBlur}
                  autoFocus
                  bg="#374151"
                  border="1px solid #4B5563"
                  borderRadius="8px"
                  color="#F9FAFB"
                  _focus={{
                    borderColor: "#3B82F6",
                    boxShadow: "0 0 0 1px #3B82F6",
                    bg: "#4B5563",
                  }}
                  _placeholder={{
                    color: "#9CA3AF",
                  }}
                  px="3"
                  py="2"
                  fontSize="14px"
                  position="absolute"
                  right="0"
                  top="-16px"
                  width="100vw"
                  maxW="calc(100vw - 32px)"
                  zIndex="20"
                  transition="all 0.3s ease"
                  transform="translateX(0)"
                  opacity="1"
                />
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleSearchClick}
                  bg="transparent"
                  color="#9CA3AF"
                  _hover={{
                    bg: "#374151",
                    color: "#F9FAFB",
                  }}
                  p="2"
                  borderRadius="8px"
                  minW="auto"
                  h="40px"
                >
                  <Search size={20} />
                </Button>
              )}
            </>
          ) : (
            // Desktop: Always visible input field
            <Box position="relative" width="280px">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                bg="#374151"
                border="1px solid #4B5563"
                borderRadius="8px"
                color="#F9FAFB"
                _focus={{
                  borderColor: "#3B82F6",
                  boxShadow: "0 0 0 1px #3B82F6",
                  bg: "#4B5563",
                }}
                _placeholder={{
                  color: "#9CA3AF",
                }}
                px="3"
                py="2"
                pl="10"
                fontSize="14px"
                width="100%"
                transition="all 0.3s ease"
              />
              <Box
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                pointerEvents="none"
              >
                <Search size={18} color="#9CA3AF" />
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
