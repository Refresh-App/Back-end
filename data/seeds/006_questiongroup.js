exports.seed = function(knex) {
    return knex("question_groups")
        .del()
        .then(function() {
            // Sqlite 3 does not support Int[]
            const questions =
                process.env.NODE_ENV === "test" || process.env.DB_ENV === "development" ?
                "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            return knex("question_groups").insert([
                { name: "onboarding", question_ids: questions, in_progress: false }
            ]);
        });
};