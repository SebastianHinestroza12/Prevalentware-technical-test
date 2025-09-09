import { GET, POST, PUT, DELETE } from '../../../__mocks__/api/movements';

describe('Movements API (mocked)', () => {
  it('GET should return movements', async () => {
    const req = new Request('http://localhost/api/movements?userId=1');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.data[0].concept).toBe('Test');
  });

  it('POST should create movement', async () => {
    const req = new Request('http://localhost/api/movements', {
      method: 'POST',
      body: JSON.stringify({ concept: 'Created' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
  });

  it('PUT should update movement', async () => {
    const req = new Request('http://localhost/api/movements', {
      method: 'PUT',
      body: JSON.stringify({ id: '3', concept: 'Updated' }),
    });
    const res = await PUT(req);
    expect(res.status).toBe(200);
  });

  it('DELETE should delete movement', async () => {
    const req = new Request('http://localhost/api/movements', {
      method: 'DELETE',
      body: JSON.stringify({ id: '4' }),
    });
    const res = await DELETE(req);
    expect(res.status).toBe(204);
  });

  it('GET without userId should still return 200 (mocked)', async () => {
    const req = new Request('http://localhost/api/movements');
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});


it('POST should receive correct body', async () => {
  const payload = { concept: 'Salary', amount: 2000 };
  const req = new Request('http://localhost/api/movements', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const res = await POST(req);
  const json = await res.json();

  expect(res.status).toBe(201);
  expect(json.concept).toBe('Created');
  const sentBody = await req.json();
  expect(sentBody).toEqual(payload);
});


it('GET should always return an array of movements', async () => {
  const req = new Request('http://localhost/api/movements?userId=99');
  const res = await GET(req);
  const json = await res.json();

  expect(Array.isArray(json.data)).toBe(true);
  expect(json.data[0]).toHaveProperty('concept');
});

it('PUT should return updated movement with new concept', async () => {
  const updatePayload = { id: '10', concept: 'Rent' };
  const req = new Request('http://localhost/api/movements', {
    method: 'PUT',
    body: JSON.stringify(updatePayload),
  });

  const res = await PUT(req);
  const json = await res.json();

  expect(res.status).toBe(200);
  expect(json.concept).toBe('Updated');
});


it('DELETE should not return body', async () => {
  const req = new Request('http://localhost/api/movements', {
    method: 'DELETE',
    body: JSON.stringify({ id: '5' }),
  });

  const res = await DELETE(req);
  expect(res.status).toBe(204);

  const text = await res.text();
  expect(text).toBe('');
});
