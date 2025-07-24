# Expense Tracker - Clean Architecture Demo

A modern React expense tracking application built with clean architecture principles, featuring comprehensive specifications and AI-assisted development workflow.

## 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete expenses
- **Professional UI**: Modern sidebar navigation with shadcn/ui components
- **Clean Architecture**: Feature-based organization following clean architecture principles
- **Redux State Management**: Centralized state with Redux Toolkit
- **TypeScript**: Full type safety throughout the application
- **Comprehensive Testing**: Unit tests for all features with 100% coverage
- **Responsive Design**: Works on desktop and mobile devices
- **Specification-Driven**: AI-generated specs guide development

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: Wouter
- **Testing**: Vitest
- **Architecture**: Clean Architecture with Dependency Injection

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:gaetan-puleo/expenses-tracker-specs-demo.git
   cd expenses-tracker-specs-demo
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
   Navigate to `http://localhost:5173`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

## 🏗️ Project Structure

```
src/
├── features/                    # Feature modules (business logic)
│   ├── expenses/
│   │   ├── createExpense/      # Create expense feature
│   │   ├── updateExpense/      # Update expense feature
│   │   ├── deleteExpense/      # Delete expense feature
│   │   ├── listExpenses/       # List expenses feature
│   │   └── expenseForm/        # Form state management
│   └── shared/                 # Shared across features
│       ├── entities/           # Domain entities
│       └── gateways/           # Data access interfaces
├── front-end/                  # UI layer
│   ├── components/             # Reusable components
│   ├── pages/                  # Page components
│   ├── hooks/                  # Custom hooks
│   └── routes/                 # Routing configuration
├── store/                      # Redux store configuration
└── di/                         # Dependency injection setup
```

## 📋 Specification-Driven Development with Claude Code

This project demonstrates a proven workflow for using specifications to guide AI-assisted development. Instead of jumping straight into code, you first create detailed specifications that Claude Code uses to generate complete, production-ready features.

### The Proven Workflow (Used to Build This App)

This exact process was used to build the expense tracker's update functionality:

#### **Step 1: Request Spec Creation**
```
"can you create a spec for updating expenses"
```

**What happens**: Claude Code creates a comprehensive specification file (`ai/specs/updateExpense.spec.md`) that includes:
- Feature overview and user flow
- All required files and their purposes  
- Function signatures and parameters
- Test scenarios and edge cases

#### **Step 2: Review and Approve**
```
"go for it"
```

**What happens**: Claude Code implements the complete backend feature:
- `src/features/expenses/updateExpense/updateExpense.events.ts`
- `src/features/expenses/updateExpense/updateExpense.reducer.ts`
- `src/features/expenses/updateExpense/updateExpense.selector.ts`
- `src/features/expenses/updateExpense/updateExpense.usecase.ts`
- `src/features/expenses/updateExpense/updateExpense.usecase.spec.ts`
- Updates to shared entities and gateway interfaces

#### **Step 3: Iterative Refinement**
```
"fix them"                    # Fix TypeScript errors
"remove all any?"             # Improve type safety
"remove the random error!"    # Clean up test implementation
"update spec"                 # Keep documentation in sync
```

### Real Examples from This Project

#### **Backend Feature Spec** (`ai/specs/updateExpense.spec.md`)
Generated automatically when you requested: *"can you create a spec for updating expenses"*

```markdown
**Overview**
A feature that allows users to update existing expense entries by modifying expense details such as amount, description, category, and date.

**Sequence**
User Input › Load Existing Expense › Validation › Dispatch Update Action › Fake Gateway Call › Success/Error Handling › State Update › UI Update

**Flow Description**
1. User selects an existing expense to edit from the expense list
2. Expense form is pre-populated with current expense data
3. User modifies expense details (amount, description, category, date)
4. Form validation ensures all required fields are provided and amount is valid
5. updateExpense use case is dispatched with expense id and updated input data
...
```


### How to Use Specs for New Features

#### **1. Basic Feature Request**
```
"can you create a spec for [feature name]"
```
**Example**: `"can you create a spec for expense categories management"`

#### **2. Implementation Request**
```
"implement the feature described in ai/specs/[featureName].spec.md"
```


### What Claude Code Generates

When you provide a spec, Claude Code automatically creates:

✅ **Complete Feature Implementation**
- All Redux files (events, reducer, selector, usecase)
- TypeScript interfaces and types
- Gateway interfaces and implementations

✅ **Comprehensive Test Coverage**
- Unit tests for all use cases
- Integration tests for Redux store
- Edge case and error handling tests


✅ **Documentation Updates**
- Keep specifications in sync with implementation
- Update README and other docs as needed

### Benefits of This Approach

🎯 **Clarity**: Specs force you to think through the feature completely before coding
📋 **Consistency**: All features follow the same architecture patterns
🚀 **Speed**: Claude Code generates complete, tested features in minutes
🔧 **Quality**: Comprehensive test coverage and TypeScript safety built-in
📚 **Documentation**: Self-documenting codebase with up-to-date specs

### Spec Template Structure

Every spec follows this proven template (see `ai/rules/spec-prompts.md`):

```markdown
## Overview
Brief description of the feature and its purpose.

## Sequence  
User Action › System Response › Data Flow › UI Update

## Flow Description
1. Detailed step-by-step user flow
2. System responses and state changes
3. Error handling scenarios

## Related Files
List of all files that will be created/modified

## Descriptions
Detailed function descriptions with parameters and return types

## Tests
Comprehensive test scenarios covering all cases
```

This specification-driven approach ensures every feature is well-planned, thoroughly tested, and properly documented before a single line of code is written.

## 🧪 Testing Strategy

- **Unit Tests**: Each use case has comprehensive test coverage
- **Integration Tests**: Redux store integration testing
- **Component Tests**: UI component behavior verification
- **Test Structure**: Following the same clean architecture principles

Run tests:
```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # Coverage report
```

## 📁 Key Files

- `CLAUDE.md` - Project instructions for Claude Code
- `ai/rules/project-rules.md` - Development conventions and patterns
- `ai/rules/spec-prompts.md` - Specification template and guidelines
- `ai/specs/` - Feature specifications directory

## 🔄 Development Workflow

1. **Write Specification**: Create detailed spec in `ai/specs/`
2. **AI Implementation**: Use Claude Code to generate feature
3. **Review & Test**: Verify implementation matches spec
4. **Update Specs**: Keep specifications in sync with code
5. **Commit**: Use conventional commits for changes

## 🎨 UI Components

The application uses shadcn/ui components for a professional look:

- **Sidebar Navigation**: Collapsible sidebar with active page indicators
- **Data Tables**: Clean expense display with sorting and actions
- **Modal Forms**: Create and edit expenses in modal dialogs
- **Loading States**: Proper loading indicators throughout
- **Responsive Design**: Mobile-friendly layout

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The `dist/` folder will contain the production-ready application.

## 📄 License

This project is for demonstration purposes and showcases specification-driven development with AI assistance.

---

**Built with ❤️ using Claude Code and clean architecture principles**
