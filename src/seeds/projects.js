import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('6283baefcd44998f831522aa'),
  project_name: 'The Little Prince',
  start_date: '1943-01-06T03:00:00.000Z',
  finish_date: '1943-04-06T03:00:00.000Z',
  client: 'Antoine de Saint-Exupéry',
  active: true,
  employees: [
    {
      role: 'DEV',
      rate: '10',
      _id: '6283baefcd44998f831522ab',
    },
    {
      role: 'QA',
      rate: '50',
      _id: '6283baefcd44998f831522ac',
    },
    {
      role: 'TL',
      rate: '60',
      _id: '6283baefcd44998f831522ad',
    },
    {
      role: 'DEV',
      rate: '85',
      _id: '6283baefcd44998f831522ae',
    },
  ],
}];
