# Event Management System API

**Model Set 3** - NestJS Backend API Project

## Project Overview
ระบบจัดกิจกรรมและผู้เข้าร่วม (Event Management System) พัฒนาด้วย NestJS and TypeScript

## Technology Stack
- **Framework**: NestJS
- **Language**: TypeScript (strict mode)
- **API Style**: REST API
- **Database**: In-memory (Array-based)
- **API Documentation**: Swagger (OpenAPI)

## Getting Started

### Install
```bash
npm install
```

### Run
```bash
npm run start:dev
```

### Swagger
```
http://localhost:3000/api
```

## Project Structure
```
src/
├── main.ts
├── app.module.ts
├── common/
│   ├── interfaces/
│   │   └── api-response.interface.ts
│   └── utils/
│       ├── response.util.ts
│       └── global-exception.filter.ts
└── modules/
    ├── events/
    │   ├── event.interface.ts
    │   ├── event.dto.ts
    │   ├── events.service.ts
    │   ├── events.controller.ts
    │   └── events.module.ts
    └── participants/
        ├── participant.interface.ts
        ├── participant.dto.ts
        ├── participants.service.ts
        ├── participants.controller.ts
        └── participants.module.ts
docs/
├── api-specification.md
├── data-model.md
└── uml-diagram.md
```

## Documentation
- [API Specification](./src/docs/api-specification.md)
- [Data Model](./docs/data-model.md)
- [UML Diagram](./docs/uml-diagram.md)
