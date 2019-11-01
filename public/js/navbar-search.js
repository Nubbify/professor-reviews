//Live name search on page
$(document).ready(function() {
    $('#currentFilter').keyup(function() {
        var str = $(this).val();
        var count = 0;
        $(".review").each(function() {
            if ($(this).find("h5").text().search(new RegExp(str, "i")) < 0) {
                $(this).hide();
            }
            else {
                $(this).show();
                count++;
            }
        })
        if (count == 0) {
            $('#noMatches').text("No matches found for " + str);
            $('#noMatches').show();
        } else {
            $('#noMatches').text("");
            $('#noMatches').hide();
        }
    });
});

//Class search
function findByClass() {
    var className = encodeURIComponent($('#classSearch').val());
    let href = "/class/" + className;
    if (className != "")
        window.location.href = href;
}

//Dept search
function findByDepartment() {
    var deptName = encodeURIComponent($('#deptSearch').val());
    let href = "/department/" + deptName;
    if (deptName != "")
        window.location.href = href;
}