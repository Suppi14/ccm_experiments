ccm.files[ 'configs.js' ] = {

    "localhost": {
        "data": {
            "store": [ "ccm.store", { "name": "ccm_quiz", "url": "http://localhost:3000" } ],
            "key": "question_answer_pairs"
        },
        "onfinish": {
            "store": {
                "settings": { "name": "ccm_quiz", "url": "http://localhost:3000" },
                "key": "question_answer_pairs"
            },
            "alert": "Saved!"
        }
    }

};