import { Application } from 'express';
import axios from 'axios';

export default function (app: Application): void {
  app.get('/task/:id([0-9]+)', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await axios.get(`http://host.docker.internal:4000/task/${id}`);
      res.render('task-details', { task: response.data });
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return res.status(404).render('not-found');
      }
      res.status(500).render('task-details', {});
    }
  });
}
