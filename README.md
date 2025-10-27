# Product Catalog Web Application

A modern, responsive product catalog built with React, TypeScript, and Chakra UI. This application provides a seamless shopping experience with advanced filtering, search functionality, and smooth animations.

## ✨ Features

- 🔍 **Advanced Search & Filtering** - Real-time product search with category filtering and multiple sorting options
- 📱 **Responsive Design** - Mobile-first approach with seamless desktop experience
- 💖 **Favorites Management** - Add/remove products to favorites with localStorage persistence
- 📄 **Pagination** - Efficient product browsing with pagination controls
- 🎨 **Smooth Animations** - Beautiful transitions and micro-interactions using Framer Motion
- 🌙 **Dark Theme** - Modern dark theme with carefully chosen color palette
- ⚡ **Performance Optimized** - React Query for efficient data fetching and caching
- 🔧 **TypeScript** - Full type safety and enhanced developer experience

## 🚀 Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd products-catalog-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (default Vite port)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🏗️ Architecture & Design Decisions

### 🎨 **UI Framework Choice - Chakra UI**

**Decision**: Chakra UI as the primary component library
**Reasoning**:

- Provides a consistent, accessible design system
- Excellent TypeScript support out of the box
- Built-in responsive design utilities
- Flexible theming capabilities
- Active community and regular updates

### 🎯 **State Management Strategy**

**Decision**: Combination of React Query + Local State
**Reasoning**:

- **React Query** for server state management (product data, categories)
- **Local React State** for UI state (filters, pagination, favorites)
- Reduces complexity while maintaining performance
- Automatic caching and background refetching

### 🎨 **Styling Approach**

**Decision**: Hex color codes instead of utility classes
**Reasoning**:

- Better compatibility across different devices (some Android phones don't recognize utility color classes)
- More explicit and maintainable color values
- Consistent color palette throughout the application

### 🔄 **Data Fetching Pattern**

**Decision**: useQuery hook pattern
**Reasoning**:

- Declarative data fetching
- Built-in loading and error states
- Automatic caching and deduplication
- Background refetching for fresh data

### ✨ **Animation Strategy**

**Decision**: Framer Motion for animations
**Reasoning**:

- Declarative animation API
- Performance optimized animations
- Gesture support for mobile interactions
- Easy to implement complex animation sequences

### 📱 **Mobile-First Design**

**Decision**: Responsive design with mobile-first approach
**Reasoning**:

- Growing mobile usage trends
- Better performance on mobile devices
- Progressive enhancement for larger screens
- Improved SEO rankings

### 🏢 **Component Architecture**

**Decision**: Atomic design principles with clear separation of concerns
**Structure**:

```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── services/      # API service layer
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

### 🎨 **Color Palette**

The application uses a carefully selected dark theme palette:

- **Background**: `#111827` (Primary) / `#1F2937` (Secondary)
- **Text**: `#F9FAFB` (Primary) / `#9CA3AF` (Secondary)
- **Accent**: `#3B82F6` (Blue) / `#60A5FA` (Light Blue)
- **Borders**: `#374151` / `#4B5563`
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

### ⚡ **Performance Optimizations**

1. **Pagination**: Limits DOM nodes for better performance
2. **React Query**: Intelligent caching and background updates
3. **Lazy State Updates**: Debounced search and filter operations
4. **Image Optimization**: Error handling and fallback images
5. **Bundle Splitting**: Vite's automatic code splitting

### 🔐 **Type Safety**

**Decision**: Full TypeScript implementation
**Benefits**:

- Compile-time error detection
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring and maintenance

### 💾 **Data Persistence**

**Decision**: localStorage for user preferences
**Implementation**:

- Favorites are persisted across browser sessions
- No backend authentication required
- Instant data availability

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **UI Library**: Chakra UI 3.28.0
- **Animations**: Framer Motion 12.23.24
- **State Management**: TanStack React Query 5.90.5
- **Icons**: Lucide React 0.546.0
- **Styling**: Tailwind CSS 4.1.16 (utility classes)
- **HTTP Client**: Native Fetch API
- **Data Source**: FakeStore API

## 📦 Project Structure

```
products-catalog-web/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Sidebar.tsx
│   │   └── Pagination.tsx
│   ├── pages/           # Page components
│   │   └── ProductCatalog.tsx
│   ├── services/        # API services
│   │   └── productService.ts
│   ├── types/           # TypeScript definitions
│   │   └── product.ts
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # App entry point
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🔮 Future Enhancements

- Shopping cart functionality
- User authentication and profiles
- Product reviews and ratings system
- Advanced filtering (price range, ratings)
- Product comparison feature
- Wishlist sharing capabilities
- Integration with payment gateways
- Admin panel for product management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Created by :

## Abdelouahed Amalas
