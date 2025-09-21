# iFile - Document Management App

This is the documentation for the App. It includes technical documentation and the reasons of some decisions. Also what could be improved.

## Features

- **Document listing**: List of documents
- **Document add form**: Form to add a new Document (not connected to API)
- **Document sorting and view mode**: Toggle between list and grid view. Also sort by date and document name
- **Real-time Notifications**: WebSocket integration for live notifications. Notifications are saved locally, so will still be the same after restarting the app.
- **Internationalization**: Multi-language support with i18next. Only english has been added
- **Toast Notifications**: User feedback for actions and errors

## Tech Stack

- **Framework**: React Native 0.81.4 with Expo SDK 54
- **Language**: TypeScript
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Navigation**: React Navigation
- **Animations**: React Reanimated
- **Testing**: Jest + React Native Testing Library

## Project Structure

```
src/
├── api/ # API layer and HTTP clients
├── assets/ # Static assets and localization
│ └── localization/
│ └── translations/ # i18n translation files
├── components/ # Reusable UI components
│ └── tests/ # Component tests
├── constants/ # App constants and theme
│ └── theme.ts # Design system constants
├── hooks/ # Custom React hooks
├── navigation/ # Navigation configuration
├── screens/ # Screen components
├── services/ # External services (WebSocket, etc.)
├── types/ # TypeScript type definitions
│ └── tests/ # Type tests
└── utils/ # Utility functions
└── tests/ # Utility tests
```

In a bigger project i would add a feature approach for the structure. This means that inside of src would bee a `feature` folder. Inside the same structure as now wold appear: `components`, `hooks` etc...
This would help the project organization and make easier to find files, components etc...

## Design System

The app uses a comprehensive design system built on a 4px grid:

### Spacing Units

```typescript
UNIT = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  XXL: 24,
  XXXL: 32,
};
```

### Color Palette

- **Primary**: Blue color scheme
- **Backgrounds**: Multi-level background hierarchy
- **Text**: Primary, secondary, and tertiary text colors
- **Borders**: Consistent border colors across components

### Typography

- **Font Sizes**: XS (12px) to XXL (24px)
- **Font Weights**: Light (300) to Bold (700)
- **Consistent line heights**: Based on 4px grid

## Getting Started

### Prerequisites

- Node.js 23.7 or higher
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ifile
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```env
   EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Start the development server**
   ```bash
   npm run ios
   ```

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm test` - Run Jest tests
- `npm test:watch` - Run tests in watch mode

## Testing

The project includes comprehensive testing:

```bash
# Run all tests
npm test

```

### Test Coverage Areas

- **Components**: UI component rendering and interactions
- **Utils**: Utility function logic and edge cases
- **Types**: TypeScript type definitions
- **API**: HTTP client functions

## Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   npx expo start --clear
   ```

2. **Environment variables not loading**
3. - Restart the development server after changes

4. **Type checking errors**

   ```bash
   npx tsc --noEmit
   ```

5. **ESLint errors**
   ```bash
   npm run lint:fix
   ```

## Why Expo and not just React Native?

Multiple reasons:

1. React native team recommends it by default
2. I'm used to work with it, this way i could "make it work" faster
3. Adds some interesting features that can be usefull: expo go etc...

## Why certain libraries are used?

1. React Query: a standard, helps with caching, refetching, error handling etc...
2. React Hook Form: makes very easy to handle form inputs, errors, form state. Also a standard.
3. React Reanimated: a standard, makes adding animations really easy. Also i'm used to it.
4. React navigation: despite the app not having any navigation, it adds a base for future features and screens that could be added.
5. React Native Actions Sheet: i wanted to use an existent library to implement the modal view. Implementing from scratch with a proper performance and extensability would be time consuming.
6. Expo Vector Icons: as i didn't have access to the app assets, i wanted to have icons in a quick way. In a real environment only needed icons and assets would be added to the app.
7. i18: it's a standard for app localization
8. React native toast message: i also didn't want to spend much time in this part (as with the action sheet), as it can be time consuming and was not required in the description.
9. React Native async storage: in a real scenario i would use a more performant option, but this was quicker to integrate.
10. React native document picker: is the recommended from expo documentation to handle native document selection.

## Future improvements:

1. Also add offline mode for the documents list (asme as for the notifications)
2. Improve the testing part. Snapshot tests could be added. Also E2E tests.
3. I wanted to add error monitoring, like Sentry, but didn't have enough time.
4. With time i would have also deployed the app, maybe just to Firebase App distribution
5. The styling could also be improved. With a proper design system from a designer would improve a lot
