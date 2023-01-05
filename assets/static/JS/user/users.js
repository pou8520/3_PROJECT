function signin_modal() {
    $(".modal_1").fadeIn();

    $(document).mouseup(function (e) {
        if ($(".modal_1").has(e.target).length === 0) {
            $(".modal_1").hide();
        };
    });
};

function signup_modal() {
    $(".modal_2").fadeIn();

    $(document).mouseup(function (e) {
        if ($(".modal_2").has(e.target).length === 0) {
            $(".modal_2").hide();
        };
    });
};