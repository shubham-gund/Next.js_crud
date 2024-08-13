import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Item, { IItem } from '../../../models/items';

type Data = {
  success: boolean;
  data?: IItem | {};
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const item = await Item.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedItem = await Item.deleteOne({ _id: id });
        if (!deletedItem) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
