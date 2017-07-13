const Agenda = require('agenda');

// const url = 'mongodb://localhost:27017/meanauth';
const url = process.env.MONGOLAB_URI;

const agenda = new Agenda({db: {address: url}});

// var jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];
//
// jobTypes.forEach(function(type) {
//   require('./lib/jobs/' + type)(agenda);
// })
//
// if(jobTypes.length) {
//   agenda.start();
// }

agenda.on('ready', function() {
  agenda.start();
});

module.exports = agenda;
