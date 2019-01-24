const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
exports.helloWorld = functions.firestore.document('fcm-tokens/{id}')
    .onCreate((snapshot, context) => {
        return admin.firestore.collection('tokens').get().then(snapshot => {
            var tokens = [];
            if (snapshot.empty) {
                return console.log('No Device');
            }
            else {
                for (var token of snapshot.docs) {
                    tokens.push(token.data().token)
                }

                var payload = {

                    "notification" : {
                        "title" : "Form",
                        "body" : "Offer",
                        "sound" : "default",

                    },
                    "data" : {
                        "sendername" : "text sendername",
                        "message" : "message",
                    }
                }

                return admin.messaging()
                    .sendToDevice(tokens, payload)
                    .catch((e) => {
                   console.log(e)
                });

            }
        });


        // admin.firestore()
        //     .collection('tokens')
        //     .get()
        //     .then((snapshot) => {
        //
        //         var tokens = [];
        //         if (snapshot.empty) {
        //             console.log('no devices');
        //             return admin.empty;
        //         }
        //         else {
        //             for (var token of snapshot.data) {
        //                 tokens.push(token.data['token']);
        //             }
        //
        //             console.log("Construction the notification message.");
        //             const payload = {
        //
        //                 // notification : {
        //                 //     "title" : "Form",
        //                 //     "body" : "Offer",
        //                 //     "sound" : "default",
        //                 //
        //                 // },
        //                 data: {
        //                     data_type: "data_type_chat_message",
        //                     title: "Tabian Consulting",
        //                     message: "simplw message",
        //                     //chatroom_id: chatroomId
        //                 }
        //             };
        //
        //             // var payload = {
        //             //     "notification" : {
        //             //         "title" : "Form",
        //             //         "body" : "Offer",
        //             //         "sound" : "default",
        //             //
        //             //     },
        //             //
        //             //     "data" : {
        //             //         "sendername" : "text sendername",
        //             //         "message" : "message",
        //             //     }
        //             // };
        //
        //             return admin.messaging().sendToDevice(token, payload);
        //
        //             //     .then((response) => {
        //             //     console.log('pushed msg');
        //             // }).catch((e) => {
        //             //     console.log(e);
        //             //     console.log(e.message);
        //             // })
        //         }
        //
        //     }).catch((e) => console.log(e));

    });





// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// exports.helloWorld = functions.database.ref('notification/{id}')
//     .onWrite((evt) => {
//
//        const payload = {
//            "notification" : {
//                "title" : "Form",
//                "body" : "Offer",
//                "badge" : "1",
//                "sound" : "default",
//
//            },
//            "data" : {
//                "sendername" : "text sendername",
//                "message" : "message",
//            },
//        };
//
//
//        return admin.database().ref('tokens').once('value')
//            .then(allToken => {
//           if (allToken.val()) {
//               const  token = allToken.val();
//               return admin.messaging(token, payload);
//           }else {
//               return null;
//           }
//        }).catch((e) => console.log(e));
//     });