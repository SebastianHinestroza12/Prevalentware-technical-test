# Finanza Ya 💰

**Finanza Ya** es una aplicación web para **gestionar tus finanzas personales** de manera fácil e intuitiva. Permite **registrar ingresos y egresos**, **ver reportes**, **administrar usuarios** y mucho más, todo en una **interfaz moderna y segura**.

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://res.cloudinary.com/dafsjo7al/image/upload/v1757344358/Macbook-Air-localhost_l13rse.png)

### Registro / Inicio de sesión
![Registro](https://res.cloudinary.com/dafsjo7al/image/upload/v1757337850/iPhone-13-PRO-prevalentware-technical-test.vercel.app_1_jtq9ou.png)  
![Login](https://res.cloudinary.com/dafsjo7al/image/upload/v1757337850/iPhone-13-PRO-prevalentware-technical-test.vercel.app_cchjwd.png)

### Página de Inicio
![Dashboard](https://res.cloudinary.com/dafsjo7al/image/upload/v1757337850/Macbook-Air-prevalentware-technical-test.vercel.app_2_xygy3m.png)

### Módulo de Usuario
![Usuarios](https://res.cloudinary.com/dafsjo7al/image/upload/v1757337850/Macbook-Air-prevalentware-technical-test.vercel.app_4_zgsq45.png)

### Ingresos y Egresos
![Ingresos Y Egresos](https://res.cloudinary.com/dafsjo7al/image/upload/v1757337849/Macbook-Air-prevalentware-technical-test.vercel.app_3_tbixuu.png)

### Reportes
![Reportes](https://res.cloudinary.com/dafsjo7al/image/upload/v1757337849/Macbook-Air-prevalentware-technical-test.vercel.app_5_pnzba2.png)

---

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para **levantar la aplicación en tu entorno local**:

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/SebastianHinestroza12/Prevalentware-technical-test.git
cd Prevalentware-technical-test
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con tus credenciales. Puedes usar la siguiente estructura:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a PostgreSQL para producción | `postgresql://usuario:password@host:puerto/db` |
| `DIRECT_URL` | URL de conexión directa a la DB (opcional, para desarrollo) | `postgresql://usuario:password@host:puerto/db` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | URL pública del endpoint de Better Auth | `http://localhost:3000/api/auth` |
| `BETTER_AUTH_SECRET` | Secreto para Better Auth | `tu_secret` |
| `BETTER_AUTH_URL` | URL local de Better Auth | `http://localhost:3000` |
| `GITHUB_CLIENT_ID` | Client ID de GitHub OAuth | `tu_github_client_id` |
| `GITHUB_CLIENT_SECRET` | Client Secret de GitHub OAuth | `tu_github_client_secret` |
| `NEXT_PUBLIC_API_URL` | URL base de la API | `http://localhost:3000/api` |
| `NEXT_PUBLIC_API_KEY` | API Key para la app | `tu_api_key` |
| `NODE_ENV` | Entorno de ejecución | `development` o `production` |

---

> **Nota:** La variable `NEXT_PUBLIC_API_KEY` es una **API Key personalizada** para esta aplicación. Actúa como una **segunda capa de seguridad** y es **obligatoria** para interactuar con la API.

### 4️⃣ Generar Prisma Client
```bash
npx prisma generate
```

### 5️⃣ Ejecutar migraciones
```bash
npx prisma migrate dev --name init
```

### 6️⃣ Cargar datos iniciales (seed)
```bash
npx prisma db seed
```

### 7️⃣ Ejecutar la aplicación
```bash
npm run dev
```
- La aplicación estará disponible en: **[http://localhost:3000](http://localhost:3000)**  

---

## ⚡ Uso

1. Regístrate o inicia sesión.  
2. Accede al **Dashboard** y visualiza tus finanzas.  
3. Agrega **ingresos y egresos** desde el módulo correspondiente.  
4. Consulta **reportes gráficos** y estadísticas.  
5. Administra usuarios si tienes permisos de administrador.  

---

## 🛠️ Tecnologías
- **Next.js**  
- **React**  
- **Tailwind CSS**  
- **Prisma + PostgreSQL (Supabase)**  
- **Better Auth** (Autenticación y OAuth)  
- **Recharts** (Gráficos de reportes)  
- **React Query**  
- **Zod** (Validaciones)  

---

## ✅ Tests

El proyecto incluye un conjunto de **tests automatizados** para verificar el correcto funcionamiento de la API y la lógica principal.  
Estos tests se encuentran en la carpeta `__tests__` y están construidos con **Jest**, usando mocks de Prisma y autenticación para simular la base de datos y la seguridad sin necesidad de conectarse a servicios externos.  

![Tests](https://res.cloudinary.com/dafsjo7al/image/upload/v1757430273/Captura_de_pantalla_2025-09-09_095454_s8q1e2.png)


### 🔹 Ejecutar tests
Para correr los tests, puedes usar cualquiera de los siguientes comandos:

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar en modo watch (ideal durante el desarrollo)
npm run test:watch

# Ejecutar con reporte de cobertura
npm run test:coverage

# Ejecutar en CI/CD (modo continuo)
npm run test:ci

```

---

## 📄 Documentación

Toda la **documentación de la API** se encuentra disponible en:  
**[http://localhost:3000/docs](https://res.cloudinary.com/dafsjo7al/image/upload/v1757339276/Macbook-Air-prevalentware-technical-test.vercel.app_6_uqbssl.png)**

---
