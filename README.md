# Quiz Generator Backend

## Overview

This backend application is a robust quiz generation service built with Express.js and TypeScript. It leverages AI capabilities to generate personalized quizzes from various document formats, with features for user management, subscriptions, and analytics.

## Core Features

### Quiz Generation & Management

-  **AI-Powered Quiz Creation**: Generates quizzes from uploaded documents (PDF, DOCX, TXT, etc.)
-  **Question Types**: Multiple-choice questions with configurable answer options
-  **Quiz Configuration**: Customizable settings for visibility and state
-  **Semantic Search**: Finds related quizzes using vector embeddings
-  **Categorization**: Organizes quizzes by categories

### User System

-  **Authentication**: JWT-based authentication via Supabase Auth
-  **User Profiles**: Manage user information and preferences
-  **Category Preferences**: Users can select preferred quiz categories

### Subscription System

-  **Stripe Integration**: Handles payments and subscription management
-  **Tiered Plans**: Different subscription levels with varying features
-  **Usage Limits**: Enforces limits based on subscription tier (quiz count, question count, etc.)

### Analytics

-  **Quiz Completions**: Tracks user completion rates
-  **Performance Metrics**: Records user performance on quizzes

## API Structure

### Routes

-  `/users`: User management endpoints
-  `/categories`: Quiz category endpoints
-  `/quizzes`: Quiz creation and management
-  `/questions`: Question management for quizzes
-  `/completions`: Quiz completion tracking
-  `/products`: Subscription product information
-  `/stripe-webhook`: Webhook endpoint for Stripe events

### Middleware System

-  **Authentication**: Validates user tokens and permissions
-  **Error Handling**: Centralized error processing
-  **File Upload**: Handles document uploads with size and type validation
-  **Validation**: Input validation for all endpoints

## Tech Stack

-  **Runtime**: Node.js
-  **Framework**: Express.js
-  **Language**: TypeScript
-  **Database**: PostgreSQL (via Drizzle ORM)
-  **Vector Database**: PostgreSQL with pgvector extension
-  **Authentication**: Supabase Auth
-  **Storage**: Supabase Storage
-  **AI Integration**: OpenAI

## Integrations

### OpenAI

-  Used for generating quiz questions from documents
-  Embedding generation for semantic search capabilities

### Stripe

-  Payment processing for subscriptions
-  Webhook handling for subscription events

### Supabase

-  Authentication services
-  File storage for quiz-related documents and images

### Vector Search

-  Document embedding using OpenAI
-  Semantic search using cosine similarity

## Database Schema

The application uses a PostgreSQL database with the following main tables:

-  `user`: User information and preferences
-  `quiz`: Quiz metadata and configuration
-  `question`: Quiz questions
-  `answer_option`: Answer options for questions
-  `completion`: Quiz completion records
-  `category`: Quiz categories

## File Processing

-  Supports multiple document formats (PDF, DOCX, TXT)
-  Document parsing and chunking for efficient processing
-  Token counting to optimize API usage

## Security Features

-  JWT authentication for all protected routes
-  Input validation and sanitization
-  Rate limiting and usage controls
-  Permission-based access control

## Development

### Prerequisites

-  Node.js v18+
-  PostgreSQL with pgvector extension
-  Supabase account
-  Stripe account
-  OpenAI API key

### Environment Variables

```config
# .env file
DATABASE_URL=postgresql://username:password@localhost:5432/db
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key
OPENAI_API_KEY=your-openai-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### Database Migrations

The project uses Drizzle ORM for database migrations. Migration files are located in the `drizzle/migrations` directory.

## Architecture

The application follows a layered architecture:

1. **Routes**: Define API endpoints
2. **Middlewares**: Handle request processing
3. **Services**: Business logic implementation
4. **Utils**: Helper functions
5. **Database**: Data persistence

The application uses a middleware pattern for request processing, with a focus on reusability and separation of concerns.
