
const localeSettings = {};
  dayjs.locale(localeSettings);

$(function () {

  $(document).ready(function() {
    function displayCurrentDate() {
      var currentDate = dayjs().format('dddd, MMMM DD YYYY');
      $('#currentDay').text(currentDate);
      const currentHour= dayjs().hour();
      $('#time').text(dayjs().format('hh:mm:ss A'));
      return currentHour;
    }
    displayCurrentDate();
  
  function colorByHour() {
    const currentHour = displayCurrentDate()
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      
    });
  }

  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  function changeColor() {
    const currentHour = dayjs().hour();
    $('.time-block').removeClass('past present future');
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  textEntry();
  changeColor();
setInterval(colorByHour,60000);
});
});