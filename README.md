# Tech.Care Patient Dashboard

A modern medical dashboard application built with Next.js, React, and TypeScript for managing patient information and diagnostics.

## Features

- **Patient Dashboard**: View patient information, vital signs, and diagnostic history
- **Blood Pressure Chart**: Interactive Chart.js visualization of blood pressure trends
- **Vital Signs Monitoring**: Display respiratory rate, temperature, and heart rate
- **Diagnostic List**: Comprehensive list of patient diagnoses with status indicators
- **Lab Results**: Easy access to downloadable lab reports
- **Responsive Design**: Fully responsive layout optimized for all screen sizes
- **SEO Optimized**: Includes sitemap, robots.txt, and proper meta tags
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Charts**: Chart.js with react-chartjs-2
- **Fonts**: Manrope (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

The `.env.local` file contains the API authentication credentials:
- `API_USERNAME`: coalition
- `API_PASSWORD`: skills-test

**Note:** The `.env.local` file is already created with default values for development. For production, make sure to set these environment variables securely.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   ├── globals.css         # Global styles and CSS variables
│   ├── sitemap.ts          # Sitemap configuration
│   └── robots.ts           # Robots.txt configuration
├── components/
│   ├── Header.tsx          # Top navigation header
│   ├── PatientList.tsx     # Left sidebar patient list
│   ├── BloodPressureChart.tsx # Chart.js blood pressure visualization
│   ├── VitalSigns.tsx      # Vital signs cards
│   ├── DiagnosisList.tsx   # Diagnostic table
│   └── PatientDetails.tsx  # Right sidebar patient details
├── lib/
│   └── api.ts              # API integration for patient data
├── types/
│   └── patient.ts          # TypeScript type definitions
└── tailwind.config.ts      # Tailwind CSS configuration
```

## API Integration

The application fetches patient data from:
```
https://fedskillstest.coalitiontechnologies.workers.dev
```

**Authentication:** The API requires Basic Authentication. Credentials are configured via environment variables:
- `API_USERNAME`: Username for API authentication
- `API_PASSWORD`: Password for API authentication

The data is filtered to display only Jessica Taylor's information as per requirements.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
API_USERNAME=coalition
API_PASSWORD=skills-test
```

**Security Note:** Never commit `.env.local` to version control. The `.env.example` file is provided as a template.

## Design System

### Colors
- Primary Purple: `#705AAA`
- Primary Green: `#0BD984`
- Dark Blue: `#072635`
- Active Background: `#D8FCF7` / `#01F0D0`
- Various shades of blue and gray

### Typography
- Font Family: Manrope
- Font Weights: 400 (normal), 700 (bold), 800 (extra-bold)
- Font Sizes: 14px, 18px, 24px

## Accessibility Features

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`)
- ARIA labels and roles for screen readers
- Keyboard navigation support
- Proper heading hierarchy
- Alt text for images
- Focus indicators

## SEO Features

- Meta tags for description, keywords, and Open Graph
- Sitemap.xml generation
- Robots.txt configuration
- Proper heading structure
- Semantic markup

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for a skills assessment test.

