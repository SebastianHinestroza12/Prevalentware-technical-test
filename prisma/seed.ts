import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Administrador con acceso total',
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER',
      description: 'Usuario estándar con permisos limitados',
    },
  });

  // Crear permisos
  const permissionsData = [
    { name: 'movements:read', description: 'Ver movimientos' },
    { name: 'movements:create', description: 'Crear movimientos' },
    { name: 'movements:update', description: 'Editar movimientos' },
    { name: 'movements:delete', description: 'Eliminar movimientos' },
    { name: 'users:read', description: 'Listar usuarios' },
    { name: 'users:update', description: 'Editar usuarios' },
    { name: 'users:create', description: 'Crear usuarios' },
    { name: 'users:delete', description: 'Eliminar usuarios' },
    { name: 'reports:read', description: 'Ver reportes' },
    { name: 'reports:export', description: 'Exportar reportes en CSV' },
  ];

  await prisma.permission.createMany({
    data: permissionsData,
    skipDuplicates: true,
  });

  const allPermissions = await prisma.permission.findMany();

  // Asignar TODOS los permisos al ADMIN
  for (const p of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: p.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: p.id,
      },
    });
  }

  // Asignar solo `movements:read` a USER
  const userPermissions = allPermissions.filter((p) =>
    ['movements:read'].includes(p.name)
  );

  for (const p of userPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: userRole.id,
          permissionId: p.id,
        },
      },
      update: {},
      create: {
        roleId: userRole.id,
        permissionId: p.id,
      },
    });
  }

  console.log('✅ Seed ejecutado con roles y permisos');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
