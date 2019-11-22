
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('answers').del()
    .then(function () {

      const getRandomInt = (min, max) =>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }

      function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      }
    
    randomDate(new Date(2012, 0, 1), new Date())

      const fakeAnswers = []
      for(let i = 0 ; i < 10000;i++){
        fakeAnswers.push({
          answer:getRandomInt(1,10),
          question_id:getRandomInt(11,13),
          user_id:getRandomInt(1,827),
          answer_date: randomDate(new Date(2019, 10, 1), new Date(2020, 10, 1))
        })
      }
      // Inserts seed entries
      return knex('answers').insert(fakeAnswers);
    });
};
