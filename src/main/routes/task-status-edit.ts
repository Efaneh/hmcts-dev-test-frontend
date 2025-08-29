import { Application } from 'express';
import axios from 'axios';

export default function editStatusRoute(app: Application): void {
  app.get('/task/:id/status/edit', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await axios.get(`http://host.docker.internal:4000/task/${id}`);
      res.render('edit-status', { taskId: response.data.id, currentStatus: response.data.status });
    } catch {
      res.status(500).render('edit-status', { taskId: id, currentStatus: '' });
    }
  });

  app.post('/task/:id/status/edit', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      //Should be patch for partial update, but I didn't want to get into SpringSecurityConfig for this demo
      await axios.put(`http://host.docker.internal:4000/task/${id}`, { status });
      res.redirect(`/task/${id}`);
    } catch {
      res.status(500).render('edit-status', { taskId: id, currentStatus: status });
    }
  });
}
