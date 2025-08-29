import { Application } from 'express';
import axios from 'axios';

export default function createTaskRoute(app: Application): void {
  app.get('/task/create', (req, res) => {
    res.render('task-create');
  });

   app.post('/task/create', async (req, res) => {
     const {
       caseNumber,
       title,
       description,
       status,
       daysUntilDue
     } = req.body;

     const days = parseInt(daysUntilDue, 10);

     if (!Number.isFinite(days) || days < 0) {
       return res.status(400).render('task-create', {
         error: 'Please enter a valid number of days (e.g. 7)',
         values: req.body
       });
     }

     const now = new Date();
     const dueDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
     const formattedDueDate = dueDate.toISOString().slice(0, 19);

     try {
       await axios.post('http://host.docker.internal:4000/task', {
         caseNumber,
         title,
         description,
         status,
         dueDate: formattedDueDate
       });

       res.redirect('/');
     } catch (err) {
       console.error('Error creating task:', err);
       res.status(500).render('task-create', {
         error: 'Something went wrong. Please try again.',
         values: req.body
       });
     }
   });
  }
