import { Application } from 'express';
import axios from 'axios';

export default function deleteTaskRoutes(app: Application): void {
  app.get('/task/:id/delete', async (req, res) => {
    const { id } = req.params;

    try {
      const { data: task } = await axios.get(`http://host.docker.internal:4000/task/${id}`);

      res.render('task-deletion-confirmation', {taskId: task.id });
    } catch (err) {
      console.error('Error loading task for deletion:', err.message);
      res.status(404).render('error', { message: 'Task not found' });
    }
  });

  app.post('/task/:id/delete', async (req, res) => {
    const { id } = req.params;

    try {
      await axios.delete(`http://host.docker.internal:4000/task/${id}`);
      res.redirect('/');
    } catch (err) {
      console.error('Error deleting task:', err.message);
      res.status(500).render('error', { message: 'Failed to delete task' });
    }
  });
}
