$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

function request(url, method = 'GET', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${APP_URL}${url}`,
      data,
      dataType: 'json',
      error: (jqXHR, textStatus, errorThrown) => {
        reject(errorThrown);
      },
      headers,
      method,
      success: data => {
        resolve(data);
      }
    });
  });
}
