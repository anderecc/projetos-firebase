import { db } from '@/lib/connectFirebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método não suportado.' });
    }

    try {
        const clients = [];
        await getDocs(collection(db, 'clientes'))
            .then((response) => {
                response.forEach((doc) => clients.push(doc.data()));
                clients.sort((a, b) => a.id - b.id);
                res.status(200).json({ clients });
            })
            .catch((error) => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({
            error: 'Ocorreu algum erro ao tentar buscar os Clientes.',
        });
    }
}
