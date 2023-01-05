// // $(document).ready(function () {
// //     show_review();
// // })

// function modal_open1() { 
//     $(`.modal`).fadeIn();

//     $(document).mouseup(function (e) {
//         if($(`.modal`).has(e.target).length === 0) {
//             $(`.modal`).hide();
//         };
//     });
// };


// //리뷰 조회
// function show_review() {
//     $.ajax({
//         type: "GET",
//         url: "/api/reviews",
//         data: {},
//         success: function (response) {
//             let rows = response['reviews'];

//             for (let i = 0; i < rows.length; i++) {
//                 let nickname = rows[i]['nickname'];
//                 let star = rows[i]['star'];
//                 let comment = rows[i]['comment'];

//                 let output = '';
//                 for (let j = 0; j < star; j++) {
//                      output += "★"
//                 }

//                 let temp_html = `
//                     <div class="comment-content">
//                         <div class="content-head">
//                             <div class="head-star">
//                                 ${output}
//                             </div>
//                             <div class="head-name">
//                                 ${nickname}
//                             </div>
//                         </div>
//                         <div class="content-body">
//                             ${comment}
//                         </div>
//                         <div class="content-button">
//                             <div class="button-a">
//                                 수정
//                             </div>
//                             <div class="button-a">
//                                 삭제
//                             </div>
//                         </div>
//                     </div>
//                                 `
//                 $("#comment_bottom").append(temp_html);
//             };
//         },
//     });
// }''

// // 리뷰작성
// function create_review() {
//     const name = $("#tag").val();
//     const comment = $("#comment").val();
//     const star = $("input[name=rating]:checked").val();

//     console.log(name,comment,star)
    
//     $.ajax({
//         type: "POST",
//         url: "/api/reviews",
//         data: {
//             "name_give": name,
//             "comment_give": comment,
//             "star_give": star
//         },
//         dataType: "json",
//         success: function (response) {

//             window.location.reload();
//         },
//     });
// };