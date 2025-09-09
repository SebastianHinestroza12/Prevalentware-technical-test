export const GET = jest.fn(async (req: Request) => {
  return new Response(
    JSON.stringify({ data: [{ id: '1', concept: 'Test' }] }),
    {
      status: 200,
    }
  );
});

export const POST = jest.fn(async (req: Request) => {
  return new Response(JSON.stringify({ id: '2', concept: 'Created' }), {
    status: 201,
  });
});

export const PUT = jest.fn(async (req: Request) => {
  return new Response(JSON.stringify({ id: '3', concept: 'Updated' }), {
    status: 200,
  });
});

export const DELETE = jest.fn(async (req: Request) => {
  return new Response(null, { status: 204 });
});
