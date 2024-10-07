// Initial schedule
let defaultSchedule = [
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' },
  { time: '', activity: '' }
];
  
  let schedule = [...defaultSchedule];
  
  // Holiday timetable
  const holidayTimetable = [
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' },
    { time: '', activity: '' }
  ];
  
  // Past timetable data (gathered through user input)
  let pastTimetables = [];
  
  // Selected row index
  let selectedRowIndex = null;
  
  const timetable = document.getElementById("timetable").getElementsByTagName("tbody")[0];
  const copyBtn = document.getElementById("copyBtn");
  const commentBox = document.getElementById("commentBox");
  const pastTimetableSelect = document.getElementById("pastTimetable");
  const pastDataInput = document.getElementById("pastDataInput");
  const gatherPastDataBtn = document.getElementById("gatherPastDataBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  
  function generateTimetable() {
    timetable.innerHTML = ''; // Clear previous timetable
  
    schedule.forEach((entry, index) => {
      const row = document.createElement("tr");
  
      const timeCell = document.createElement("td");
      const timeInput = document.createElement("input");
      timeInput.type = "text";
      timeInput.value = entry.time;
      timeInput.classList.add('time-input');
      timeCell.appendChild(timeInput);
      row.appendChild(timeCell);
  
      const activityCell = document.createElement("td");
      const activityInput = document.createElement("input");
      activityInput.type = "text";
      activityInput.value = entry.activity;
      activityInput.classList.add('activity-input');
      activityCell.appendChild(activityInput);
      row.appendChild(activityCell);
  
      const editCell = document.createElement("td");
      const saveButton = document.createElement("button");
      saveButton.innerText = "Save";
      saveButton.onclick = () => saveChanges(index, timeInput.value, activityInput.value);
      editCell.appendChild(saveButton);
      row.appendChild(editCell);
  
      const selectCell = document.createElement("td");
      const selectRow = document.createElement("button");
      selectRow.innerText = "Select";
      selectRow.onclick = () => selectRowForComment(index);
      selectCell.appendChild(selectRow);
      row.appendChild(selectCell);
  
      timetable.appendChild(row);
    });
  
    // Display copy button after timetable is generated
    copyBtn.style.display = "inline-block";
  }
  
  function saveChanges(index, newTime, newActivity) {
    schedule[index].time = newTime;
    schedule[index].activity = newActivity;
    alert("Changes saved!");
  }
  
  function copyTimetableToClipboard() {
    let timetableText = schedule.map(entry => `${entry.time}: ${entry.activity}`).join('\n');
  
    navigator.clipboard.writeText(timetableText).then(() => {
      alert("Timetable copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
  
  function selectRowForComment(index) {
    selectedRowIndex = index;
    alert(`Row ${index + 1} selected for commenting.`);
  }
  
  function applyComment() {
    if (selectedRowIndex !== null) {
      const comment = commentBox.value.trim();
      if (comment) {
        schedule[selectedRowIndex].activity += ` (${comment})`;
        generateTimetable();
        commentBox.value = ''; // Clear the comment box
      } else {
        alert("Please enter a valid comment.");
      }
    } else {
      alert("Please select a row to comment.");
    }
  }
  
  // Handle past timetable selection
  pastTimetableSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    if (selectedValue === "holiday") {
      schedule = [...holidayTimetable];
    } else if (selectedValue !== "default") {
      schedule = pastTimetables[selectedValue];
    }
    generateTimetable();
  });
  
  // Gather past data from input
  gatherPastDataBtn.addEventListener("click", () => {
    const pastDataText = pastDataInput.value.trim();
    if (pastDataText) {
      const newTimetable = pastDataText.split('\n').map(line => {
        const [time, activity] = line.split(': ');
        if (time && activity) {
          return { time: time.trim(), activity: activity.trim() };
        }
      }).filter(entry => entry); // Filter out any invalid entries
  
      pastTimetables.push(newTimetable);
  
      // Add the new past timetable to the dropdown
      const newOption = document.createElement("option");
      newOption.value = pastTimetables.length - 1;
      newOption.text = `Past Timetable ${pastTimetables.length}`;
      pastTimetableSelect.appendChild(newOption);
  
      alert("Past timetable added!");
      pastDataInput.value = ''; // Clear the input box
    } else {
      alert("Please enter valid past timetable data.");
    }
  });
  
  // Refresh button logic
  refreshBtn.addEventListener("click", () => {
    schedule = [...defaultSchedule];
    generateTimetable();
    alert("Timetable has been refreshed to default.");
  });
  
  // Event Listeners
  document.getElementById("generateBtn").addEventListener("click", generateTimetable);
  document.getElementById("copyBtn").addEventListener("click", copyTimetableToClipboard);
  document.getElementById("applyCommentBtn").addEventListener("click", applyComment);
  