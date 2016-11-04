var grtEdit = {
  publisher_by_id: function(obpg_publisher_id) {
    grt.jsConfigs.api_params.obpg_publisher_id = obpg_publisher_id;
    var url_str = "";
    var andamp = "";
    for (var i in grt.jsConfigs.api_params) {
      param = grt.jsConfigs.api_params[i];
      console.log("jsConfigs.api_params." + i + " is " + param);
      if (param.length > 0) {
        console.log("length of " + i +
          " is worth considering because it is " + param + "!");
        url_str += andamp + i + "=" + param;
        andamp = "&";
      }
    }
    console.log("now that we are out of that for loop ...");
    console.log(url_str);
    $.ajax({
      url: grt.jsConfigs.hive_url,
      type: "GET",
      data: url_str,
      dataType: "json",
      success: function(return_val) {
        console.log("we have much success with " + obpg_publisher_id);
        console.log(return_val);
        // $("#results").jqGrid("GridUnload");
        $.jgrid.gridUnload("results");
        $("#results").jqGrid({
          datatype: "local",
          data: return_val,
          colModel: [{
              label: "Edit",
              name: "actions",
              width: 110,
              formatter: "actions",
              formatoptions: {
                keys: false,
                editButton: true,
                delbutton: false,
                url: grt.jsConfigs.hive_url +
                  "?request_type=edit",
                afterSave: function(options, postdata) {
                  return {
                    myData: "obpg_id" + postdata
                  };
                },
                editOptions: {},
                addOptions: {},
                delOptions: {}
              }
            }, {
              label: "Unique ID",
              name: "obpg_id",
              width: 0,
              key: true,
              editable: false,
              hidden: true,
            }, {
              label: "Guar ID",
              name: "obpg_guarantee_id",
              width: 0,
              editable: false,
              hidden: true,
            }, {
              label: "Platform",
              name: "obpg_platform",
              width: 80,
              editable: true,
              edittype: "select",
              formatter: "select",
              editoptions: {
                value: "tablet:tablet;desktop:desktop;mobile:mobile"
              }
            }, {
              label: "Guarantee Name",
              name: "obgu_name",
              formatter: "text",
              width: 150,
              editable: false,
            }, {
              label: "Contract Name",
              name: "obgc_name",
              formatter: "text",
              width: 70,
              editable: false,
            }, {
              label: "Begin Date",
              name: "obpg_effective_date",
              width: 100,
              editable: false,
              hidden: false,
              formatter: "text",
            }, {
              label: "End Date",
              name: "obpg_termination_date",
              width: 100,
              editable: false,
              hidden: false,
              formatter: "text",
            }, {
              label: "Months",
              name: "obpg_stats_date",
              width: 100,
              editable: false,
            }, {
              label: "Curr.",
              name: "obpg_guaranteed_currency_id",
              width: 0,
              editable: false,
              edittype: "select",
              formatter: "select",
              hidden: true,
              editoptions: {
                value: "1:USD;2:CAD;3:EURO;4:GBP;5:ILS;6:AUD;7:MXN;8:BRL;9:SEK;10:SGD;11:RUB;12:NZD;13:INR;14:JPY;15:PHP;16:CHF"
              }
            }, {
              label: "Curr.",
              name: "rfsc_symbol",
              width: 70,
              editable: false,
              formatter: "text",
              hidden: false,
            }, {
              label: "RPM",
              name: "obpg_guaranteed_rpm",
              width: 60,
              editable: true,
              formatter: "currency",
              formatoptions: {
                decimalSeparator: ".",
                thousandsSeparator: ",",
                decimalPlaces: 2
              }
            }, {
              label: "Source ID",
              name: "obpg_source_id",
              width: 100,
              editable: true,
            }, {
              label: "Min PV",
              name: "obpg_min_pvs",
              width: 110,
              editable: true,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            }, {
              label: "Max PV",
              name: "obpg_max_pvs",
              width: 110,
              editable: true,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            }, {
              label: "AB Threshhold",
              name: "obpg_adblock_threshold",
              width: 110,
              editable: true,
              hidden: false,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            }, {
              label: "Agg.",
              name: "obgup_aggregation_type",
              width: 70,
              editable: false,
              hidden: true,
              edittype: "select",
              formatter: "select",
              editoptions: {
                value: "MIN:MIN;MAX:MAX;SUM:SUM"
              }
            }, {
              label: "AB %",
              name: "obpg_adblock_percentage",
              width: 110,
              editable: true,
              hidden: false,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            }, {
              label: "Viewability %",
              name: "obpg_viewability_percentage",
              width: 110,
              editable: true,
              hidden: false,
              formatter: "integer",
              formatoptions: {
                thousandsSeparator: ",",
                defaultValue: "0"
              }
            }, {
              label: "Widget ID",
              name: "obpg_widget_id",
              width: 90,
              editable: true,
              edittype: "select",
              formatter: "select",
              hidden: false,
              editoptions: {
                value: widget_id
              }
            },
            // label: 'Widget ID',
            // name: 'obpg_widget_id',
            // width: 90,
            //editable: true,
            // }
          ],
          viewrecords: true, // show the current page, data rang and total records on the toolbar
          rowNum: 100,
          rowList: [100, 200, 300, 400,
            500
          ],
          pager: "#pager",
          sortname: "obpg_id",
          toppager: true,
          cloneToTop: false,
          sortorder: "desc",
          width: 1280,
          multiselect: true,
          height: "100%",
          caption: "Results: Publisher ID " + obpg_publisher_id,
          grouping: true,
          groupingView: {
            groupField: ["obpg_platform"],
            groupText: [
              "<input type='checkbox' class='groupHeader'/> <b>  {0}  </b>"
            ],
            groupOrder: ["asc"],
            groupCollapse: true,
            groupSummaryPos: ["header"],
          },
          onSelectAll: function(rowIds, allChecked) {
            $("input.groupHeader").attr("checked", allChecked);
          }
        }); /* end jgrid basics */
        /* add editing tools */
        $("#chngroup").change(function() {
          var vl = $(this).val();
          if (vl) {
            if (vl == "clear") {
              $("#results").jqGrid("groupingRemove", true);
            } else {
              $("#results").jqGrid("groupingGroupBy", vl);
            }
          }
        });
        $("#results").navGrid("#results_toppager", {
          refreshstate: "current",
          add: false,
          edit: false,
          del: true,
          search: true,
          refresh: false
        }, {
          // modal only sends 1 id at a time
          url: grt.jsConfigs.hive_url + "?request_type=edit",
          onClickButton: function() {
            var ids = $("#results").jqGrid("getGridParam",
              "selarrrow");
            alert(ids);
          },
          onclickSubmit: function() {
            var ids = $("#results").jqGrid("getGridParam",
              "selarrrow");
            alert(ids);
          }
        }, {
          url: grt.jsConfigs.hive_url + "?request_type=add"
        }, {
          url: grt.jsConfigs.hive_url + "?request_type=delete",
          onclickSubmit: function() {
            $(".ui-state-highlight").hide();
            $(".ui-widget-overlay").hide();
            $("#delmodresults").hide();
          }
        }).navButtonAdd("#results_toppager", {
          // this is the fixed ids, clear modal that does not pull in info
          caption: "Edit <div id='Modal' role='dialog' title='Edit Modal'></div>",
          title: "finish-edit-button",
          buttonicon: "ui-icon-locked",
          recreateForm: true,
          onClickButton: function() {
            var ids = []
            var ids = $("#results").jqGrid("getGridParam",
              "selarrrow");
            var inner_modal =
              "<form id='edit_modal'><fieldset>" +
              // <option selected='' value='0'>Catchall</option>
              // + "<input class='modal_threshhold' id='modal_threshhold' name='modal_ids' placeholder='IDs' type='text' readonly></br>"
              "<div class='text'> Platform </span><select class='obpg_platform' name='obpg_platform' id='obpg_platform'><option selected='' value='0'>Catchall</option><option selected ='' value='Desktop'>Desktop</option><option selected='' value='Mobile'>Mobile</option><option selected='' value='Tablet'>Tablet</option></select></div></br>" +
              "<input class='obpg_guaranteed_rpm' value='' id='obpg_guaranteed_rpm' name='obpg_guaranteed_rpm' placeholder='RPM' type='number' step='0.01'></br>" +
              "<input class='obpg_min_pvs' value='' id='obpg_min_pvs' name='obpg_min_pvs' placeholder='Min PVs' type='number'></br>" +
              "<input class='obpg_adblock_percentage' value='' id='obpg_adblock_percentage' name='obpg_adblock_percentage' placeholder='AdBlock Percentage' type='number'></br>" +
              "<input class='obpg_viewability_percentage' value='' id='obpg_viewability_percentage' name='obpg_viewability_percentage' placeholder='Viewability Percentage' type='number'></br>" +
              "<input class='obpg_adblock_threshold' value='' id='obpg_adblock_threshold' name='obpg_adblock_threshold' placeholder='Max PVs' type='number'></br>" +
              "<input class='modal_maxpvs' value='' id='obpg_max_pvs' name='obpg_max_pvs' placeholder='AdBlocker Threshhold' type='number'></br>" +
              "<select class='obpg_id' id='obpg_id' name='obpg_id' style='display:none;'><option value='" +
              ids +
              "'>Current Selection</option></select></br>" +
              "<select class='obpg_id' id='obpg_id' name='obpg_id' style='display:none;'><option value='" +
              ids +
              "'>Current Selection</option></select></br>" +
              "</fieldset></form>";

            var data = {};

            $("#Modal").dialog({ //dialog form use for popup after click button in pager
              autoOpen: false,
              height: 340,
              width: 630,
              modal: true,
              buttons: [{
                text: "Submit",
                click: function() {
                  console.log(
                    "making sure ids are correct " +
                    ids);
                  var data = $(
                    "#edit_modal :input[value!='']"
                  ).serializeArray(); //.map(function(x){data[x.name] = x.value;});
                  $.ajax({
                    type: "POST",
                    url: grt.jsConfigs.hive_url +
                      "?request_type=edit",
                    data: data,

                    cache: false,
                    success: function() {
                      console.log(data);
                    }
                  });
                  $("#Modal").dialog("close");
                  alert("done");
                }
              }, {
                text: "Cancel",
                click: function() {
                  $("#Modal").dialog("close");
                }
              }],
              /* close: function() {
                                            form[ 0 ].reset();
                                            allFields.removeClass( "ui-state-error" );
                                        } */
            });
            $("#Modal").html(inner_modal);
            $("#Modal").dialog("open");
          },
          onclickSubmit: function() {
            var ids = $("#results").jqGrid("getGridParam",
              "selarrrow");
            $.ajax({
              url: grt.jsConfigs.hive_url +
                "?request_type=edit",
              data: "obpg_platform=" + platforms +
                "&obpg_guaranteed_rpm=" + rpm +
                "&obpg_min_pvs=" + minPVs +
                "&obpg_max_pvs=" + maxPVs + "&obpg_id=" +
                ids,
              dataType: "json",
              type: "POST",
            });
          }
        });
      } /* end success */
    });
  },
}
$(document).ready(function() {
  serverurl = grt.jsConfigs.hive_url +
    "?request_type=get_widget_lookups_custom"
  var widget_id = $.get(serverurl, function(widget_id) {
      console.log(widget_id);
  });

  serverurl2 = grt.jsConfigs.hive_url +
"?request_type=get_publisher_lookups"; $.getJSON(serverurl2, function(data) {
  var autocompleteData = $.map(data, function(item) {
    return {
      label: item.obpb_name,
      id: item.obpb_id
    };
  });
  $("#inputPub").autocomplete({
    source: autocompleteData,
    minLength: 1,
    select: function(event, ui) {
      $("#inputPub").val(ui.item.label);
      $("#hiddenAutocomplete").val(ui.item.id);
      console.log("id is is " + ui.item.id);
      // call this guarantee
      grtEdit.publisher_by_id(ui.item.id);
      console.log("calling jqgrid")
    }
  });
}).done(function() {
  $("#inputPub").prop("readonly", false);
});
});
