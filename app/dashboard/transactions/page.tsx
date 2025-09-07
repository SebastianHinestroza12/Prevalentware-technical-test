'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  user: { email: string };
}

export default function TransaccionesPage() {
  const { data: session, isPending } = authClient.useSession();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('Session:', session, movements);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    concept: '',
    amount: '',
    date: '',
    type: 'INCOME',
  });

  // cargar movimientos del usuario logueado
  useEffect(() => {
    const fetchMovements = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      const res = await fetch(`/api/movements?userId=${session.user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
        },
      });
      const data = await res.json();
      setMovements(data.data);
      setLoading(false);
    };
    if (!isPending) fetchMovements();
  }, [session, isPending]);

  // crear movimiento
  const handleCreate = async () => {
    if (!session?.user?.id) return;
    const res = await fetch('/api/movements', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
        userId: session.user.id,
      }),
    });

    if (res.ok) {
      setForm({ concept: '', amount: '', date: '', type: 'INCOME' });
      setOpen(false);
      const newData = await res.json();
      setMovements([newData.data, ...movements]);
    }
  };

  if (isPending) return <p className='p-6'>Cargando sesión...</p>;

  return (
    <div className='p-6 space-y-6'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-2xl font-bold'>
            Ingresos y Egresos
          </CardTitle>
          {session?.user.name === 'ADMIN' && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className='flex items-center gap-2'>
                  <PlusCircle className='w-4 h-4' /> Nuevo
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                  <DialogTitle>Nuevo Movimiento</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid gap-2'>
                    <Label>Concepto</Label>
                    <Input
                      value={form.concept}
                      onChange={(e) =>
                        setForm({ ...form, concept: e.target.value })
                      }
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label>Monto</Label>
                    <Input
                      type='number'
                      value={form.amount}
                      onChange={(e) =>
                        setForm({ ...form, amount: e.target.value })
                      }
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label>Fecha</Label>
                    <Input
                      type='date'
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label>Tipo</Label>
                    <Select
                      value={form.type}
                      onValueChange={(val) => setForm({ ...form, type: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='INCOME'>Ingreso</SelectItem>
                        <SelectItem value='EXPENSE'>Egreso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreate}>Guardar</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando movimientos...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(movements || []).map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.concept}</TableCell>
                    <TableCell
                      className={
                        m.type === 'EXPENSE' ? 'text-red-500' : 'text-green-600'
                      }
                    >
                      {m.amount.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(m.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{m.user?.email}</TableCell>
                    <TableCell>
                      {m.type === 'EXPENSE' ? (
                        <span className='flex items-center gap-1 text-red-500'>
                          <ArrowDownCircle className='w-4 h-4' /> Egreso
                        </span>
                      ) : (
                        <span className='flex items-center gap-1 text-green-600'>
                          <ArrowUpCircle className='w-4 h-4' /> Ingreso
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
