# Finanza Ya 💰

**Finanza Ya** es una aplicación web para **gestionar tus finanzas personales** de manera fácil e intuitiva. Permite **registrar ingresos y egresos**, **ver reportes**, **administrar usuarios** y mucho más, todo en una **interfaz moderna y segura**.

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://asset.cloudinary.com/dafsjo7al/476dc9a6bf452055c6c1582be669aa69)

### Registro / Inicio de sesión
![Registro](https://asset.cloudinary.com/dafsjo7al/d511d0fe19158b48e1ebec094c366731)  
![Login](https://asset.cloudinary.com/dafsjo7al/12c62f6ccd43c1b2a20b4ed4b6e5d13a)

### Página de Inicio
![Dashboard](https://asset.cloudinary.com/dafsjo7al/f48ee5adf62f36763bf871badd7f94cc)

### Módulo de Usuario
![Usuarios](https://asset.cloudinary.com/dafsjo7al/e4f4bf8b2961d201e604eda7c4de7ca3)

### Ingresos y Egresos
![Ingresos Y Egresos](https://asset.cloudinary.com/dafsjo7al/e4f4bf8b2961d201e604eda7c4de7ca3)

### Reportes
![Reportes](https://asset.cloudinary.com/dafsjo7al/8b604263b7783b8a11dd85dd3d656ac8)

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
- La documentación de la API se encuentra en: **[http://localhost:3000/docs](http://localhost:3000/docs)**

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

## 📄 Documentación

Toda la **documentación de la API** se encuentra disponible en:  
**[http://localhost:3000/docs](https://asset.cloudinary.com/dafsjo7al/af6fb78fcdc41d2fc725a2918b81bd66)**

---
