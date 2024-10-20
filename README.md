# SyntaxLab

SyntaxLab is a web-based code editor built using TypeScript and Next.js 14. It features a Monaco Editor with support for multiple programming languages and themes, along with advanced features like compilation, pair programming, and code snippet management.

## Features

- Monaco Editor integration
- Support for 40+ programming languages
- Customizable themes
- Code compilation and execution using Judge0
- Pair programming support
- User-managed code snippets with sharing capabilities
- Full-screen mode
- Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Monaco Editor
- Tailwind CSS
- Radix UI
- Judge0 (via Rapid API) for code compilation and execution
- Liveblocks for collaborative coding


### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/skdonepudi/syntaxlab.git
   cd syntaxlab
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary API keys:
   ```
   NEXT_PUBLIC_RAPIDAPI_URL='<your-rapidapi-url>'
   NEXT_PUBLIC_RAPIDAPI_HOST='<your-rapidapi-host>'
   NEXT_PUBLIC_RAPIDAPI_KEY='<your-rapidapi-key>'
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
