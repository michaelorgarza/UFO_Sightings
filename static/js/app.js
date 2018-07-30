//----------------------------------------------------
//Create Column Names
var $table = document.querySelector("table")
function generate_table(){
    var columnName = ["Date", "City", "State", "Country", "Shape", "Duration", "Comments"]
    var $thead = $table.createTHead();
    var $row = $thead.insertRow();
    // creating all cells and append the row to the end of the table body
    for(var i=0;i<columnName.length;i++){
        var $cell = document.createElement("th");
        $cell.innerHTML = columnName[i];
        $row.appendChild($cell)
    
        
    }
}
generate_table()
var $tbody = $table.createTBody()
//----------------------------------------------------\\


//----------------------------------------------------
// Render HTML table from JSON object
var tableData = data;
var max = tableData.length;
var begin = 0;
var end = 50;
var page = 0;

function renderTable(start, stop){
   $tbody.innerHTML = ""
    max = tableData.length;
    // loop through JSON and output each row into a string
    for (var i=start;i<stop;i++){
        var $dataRow = $tbody.insertRow()
        var rowData = tableData[i];
        var columns = [rowData.datetime, rowData.city, rowData.state, rowData.country, rowData.shape, rowData.durationMinutes, rowData.comments]
        for(var j=0; j<columns.length; j++){
            var $dataCell = $dataRow.insertCell(j);
            $dataCell.innerHTML = columns[j];
                if (columns[j] == rowData.columns){
                    $dataCell.style.wordWrap = "break-word";
                    $dataCell.style.minWidth = "40%";
                    $dataCell.style.maxWidth = "40%";
                }
                else {
                    $dataCell.style.wordWrap = "break-word";
                    $dataCell.style.minWidth = "10%";
                    $dataCell.style.maxWidth = "10%";
            }
         }
    }
   
}
renderTable(begin, end)
//----------------------------------------------------\\


//----------------------------------------------------
// Filter Table

//declare Input variables
var $dateI = document.querySelector("#date");
var $cityI = document.querySelector("#city");
var $stateI = document.querySelector("#state");
var $countryI = document.querySelector("#country");
var $shapeI = document.querySelector("#shape");

// buttons
var $searchbtn = document.querySelector("button");
$nextBtn = document.querySelector("#next")
$previousBtn = document.querySelector("#previous")
//Add an event listener to the buttons, call hSearch when clicked
$searchbtn.addEventListener("click", hSearch);
function hSearch(event){
event.preventDefault();

// declare search variables from input variables
var sDate = $dateI.value.toString();
if (sDate){
    var dateSplit = sDate.split("-");
    newDate = dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0]
    sDate = newDate
}
console.log("date:" + sDate)
var sCity = $cityI.value.replace(/[^0-9a-z]/gi, '').trim().toLowerCase();
console.log("city: " + sCity)
var sState = $stateI.value.replace(/[^0-9a-z]/gi, '').trim().toLowerCase();
console.log("state: " + sState)
var sCountry = $countryI.value.trim().toLowerCase();
if (sCountry === "all"){
    sCountry = ""
}
console.log("Country: " + sCountry)
var sShape = $shapeI.value.trim().toLowerCase();
if (sShape == "all"){
    sShape = ""
} 
console.log("Shape: " + sShape)

// Format the user's search by removing leading and trailing whitespace, lowercase the string
// Set tabledata to an array of all addresses whose inputs match the filter
tableData = data.filter(function(record) {
    var mDate = record.datetime.substring(0, sDate.length)

    var mCity = record.city.replace(/[^0-9a-z]/gi, '').substring(0, sCity.length).toLowerCase().trim();
    var pCity = mCity.indexOf(sCity) ///partial match

    var mfState = record.stateName.replace(/[^0-9a-z]/gi, '').substring(0, sState.length).toLowerCase().trim();
    var mStateAbb = record.state.replace(/[^0-9a-z]/gi, '').substring(0, sState.length).toLowerCase().trim();
    var pState = mfState.indexOf(sState) /// partial match
    var mCountry = record.countryName.substring(0, sCountry.length).toLowerCase().trim();
    var mShape = record.shape.substring(0, sShape.length).toLowerCase().trim();

    if (mDate === sDate && 
        ((mCity === sCity) || (pCity > -1)) &&
        ((mStateAbb === sState) || (mfState === sState) || (pState > -1)) &&
        mCountry === sCountry &&
        mShape === sShape)
    {
    return true;
    }
    return false;
  });

  begin = 0;
  end = 50;
  
  var max = tableData.length;
  
      if (max < end){
          end = max
          $nextBtn.classList.add('disabled')
      }

renderTable(begin, end);

$dateI.value = ""
$cityI.value = ""
$stateI.value = ""
$countryI.selectedIndex = 'All'
$shapeI.selectedIndex = 'All'

$previousBtn.className ='previous disabled';
$previousBtn.innerHTML = "<a href=''>Previous</a>";

$nextBtn.className = 'next';
$nextBtn.innerHTML = "<a href=''>Next 50 Results</a>"
}
//----------------------------------------------------\\

//----------------------------------------------------
// Pagination Formatting
var page = 0;

$nextBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log($nextBtn.className);

    if ($nextBtn.className == "next"){
    page += 1;
    begin += 50;
    end += 50;

    if (max < end){
        end = max
        $nextBtn.classList.add('disabled');

        $nextBtn.innerHTML = "<a href=''>No More Results</a>";
    }
    renderTable(begin, end);

    if (page == 1){
        $previousBtn.classList.remove('disabled');
        $previousBtn.innerHTML = "<a href=''>Previous Results</a>"
    }
}
});
$previousBtn.addEventListener("click", function(event){
    event.preventDefault();
    if (page>0){
        page -= 1
        if (max == end){
            $nextBtn.classList.remove('disabled');
            
                $nextBtn.innerHTML = "<a href=''>Next Results</a>";
        }
        begin -= 50;
        end -= 50;
        if(page == 0){
            $previousBtn.classList.add('disabled');
            $previousBtn.innerHTML = "<a href=''>Previous</a>"
        }
        renderTable(begin, end);
    }
})
//----------------------------------------------------\\
