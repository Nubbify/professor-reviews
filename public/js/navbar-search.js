//Class search
function findByClass() {
    let className = encodeURIComponent($('#classSearch').val());
    let href = "/class/" + className;
    if (className != "")
        window.location.href = href;
}

//Dept search
function findByDepartment() {
    let deptName = encodeURIComponent($('#deptSearch').val());
    let href = "/department/" + deptName;
    if (deptName != "")
        window.location.href = href;
}

//Teacher search
function findByTeacher() {
    let deptName = encodeURIComponent($('#teacherSearch').val());
    let href = "/teacher/" + deptName;
    if (deptName != "")
        window.location.href = href;
}