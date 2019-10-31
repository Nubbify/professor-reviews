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

function findByClass() {
    var className = encodeURIComponent($('#classSearch').val());
    let href = "/class/" + className;
    window.location.href = href;

}

function findByDepartment() {
    var deptName = encodeURIComponent($('#deptSearch').val());
    let href = "/department/" + deptName;
    window.location.href = href;
}