$(document).ready(() => {
    handleAuditTrailPannel();
    handleSelectAllCheckbox();
})

function addNewStorageType(){
    $('#sub_table tbody').empty()
    var options = { "backdrop": "static" };
    $('#AddStorageTyePopup').modal(options);
    $('#AddStorageTyePopup').modal('show');
}

function addNewStorageTypeRow(){
    var newRow = '<tr>'
    + '<td>'
    + '<select class="form-control">'
    + '<option>T50</option>'
    + '<option>T51</option>'
    + '</select>'
    + '</td>'
    + '<td>'
    + '<input type="text" class="form-control storage-type-text" required/>'
    + '</td>'
    + '<td>'
    + '<input type="text" class="form-control bin-no-text" required/>'
    + '</td>'
    + '</tr>'

    $('#sub_table tbody').append(newRow)
}

function addAllRowToTable(){
    var lst = getValidatedListToAdd();
    $.each(lst, (index, value) => {
        var whCode = value.whCode
        var storageType = value.storageType
        var binNo = value.binNo

        if(storageType === '' || binNo === ''){
            return false;
        }

        var originWhCode = ['T50', 'T51']
        var customOption = ''
        $.each(originWhCode, (index, value) => {
            var selected = value === whCode ? ' selected': '';
            var disabled = value === whCode ? '' : ' disabled';
            customOption += `<option${selected}${disabled}>${value}</option>`
        })

        var newRow = '<tr>'
        + '<td>'
        + '<input type="checkbox" class="sub_checkbox" />'
        + '</td>'
        + '<td>'
        + '<select class="form-control">'
        + customOption
        + '</select>'
        + '</td>'
        + `<td>${storageType}</td>`
        + `<td>${binNo}</td>`
        + `<td>Active</td>`
        + '</tr>'

        $('#uploadList tbody').append(newRow)
    })
    $('#AddStorageTyePopup').modal('hide');
}

function getValidatedListToAdd(){
    var originPopupList = [];
    var currentMainTableList = []
    var popupData = $('#sub_table tbody tr');
    var mainTableData = $('#uploadList tbody tr');

    $.each(popupData, (index, value) => {
        var obj = {
            whCode: $(value.childNodes[0]).find('option:selected').val(),
            storageType: $(value.childNodes[1]).find('input').val(),
            binNo: $(value.childNodes[2]).find('input').val()
        }

        originPopupList.push(obj) 
    })

    $.each(mainTableData, (index, value) => {
        var obj = {
            whCode: $(value.children[1]).find('option:selected').val(),
            storageType: value.children[2].innerHTML,
            binNo: value.children[3].innerHTML
        }

        currentMainTableList.push(obj) 
    })
    
    var finalList = originPopupList.reduce((finalLst, popupElm) => {
        if (currentMainTableList.findIndex((mainTableElm) => (mainTableElm.whCode === popupElm.whCode && mainTableElm.storageType === popupElm.storageType && mainTableElm.binNo === popupElm.binNo))  === -1) {
            finalLst.push(popupElm)
        }
        return finalLst
      }, []);

      return finalList;
}

function handleAuditTrailPannel() {
    //Panel
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }
    //Panel
}

function handleSelectAllCheckbox() {
    $('#select_all_checkbox').click(function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
    });
}

function deactiveRecord(){
    var mainTableData = $('#uploadList tbody tr');
    $.each(mainTableData, (index, value) => {
        if($(value.children[0]).find('input:checkbox').is(":checked")){
            value.children[4].innerHTML = 'Inactive'
        }
    })
}

function reactiveRecord(){
    var mainTableData = $('#uploadList tbody tr');
    $.each(mainTableData, (index, value) => {
        if($(value.children[0]).find('input:checkbox').is(":checked")){
            value.children[4].innerHTML = 'Avtive'
        }
    })
}