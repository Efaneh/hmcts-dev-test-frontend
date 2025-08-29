import { Application } from 'express';
import axios from 'axios';

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      const response = await axios.get('http://host.docker.internal:4000/tasks');
      const tasks = response.data;

      res.render('task-list', { tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.render('task-list', { tasks: [] });
    }
  });

  app.use((req, res) => {
    res.status(404).render('not-found.njk', {
      url: req.originalUrl
    });
  });
}
