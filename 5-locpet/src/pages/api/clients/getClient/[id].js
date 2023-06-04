import { db } from '@/lib/connectFirebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método não suportado.' });
    }
    const { id } = req.query;

    try {
        await getDoc(doc(db, 'clientes', id))
            .then((response) =>
                res.status(200).json({ client: response.data() })
            )
            .catch((error) => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({
            error: 'Ocorreu algum erro ao tentar buscar o Cliente.',
        });
    }
}
