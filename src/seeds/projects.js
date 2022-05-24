import mongoose from 'mongoose';

export default [{
  id: mongoose.Types.ObjectId('6283baefcd44998f831522aa'),
  project_name: 'The Little Prince',
  start_date: '1943-01-06T03:00:00.000Z',
  finish_date: '1943-04-06T03:00:00.000Z',
  client: 'Antoine de Saint-Exupéry',
  active: true,
  employees: [
    {
      role: 'DEV',
      rate: '10',
      id: '628578f0b38934591452aa2e',
    },
  ],
}];
