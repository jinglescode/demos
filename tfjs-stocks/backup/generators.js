function ComputeSMA(time_s, window_size)
{
     var r_avgs = [], avg_prev = 0;
     for (let i = 0; i <= time_s.length - window_size; i++)
     {
        var curr_avg = 0.00, t = i + window_size;
          for (let k = i; k < t && k <= time_s.length; k++)
               curr_avg += time_s[k]['price'] / window_size;

          r_avgs.push({ set: time_s.slice(i, i + window_size), avg: curr_avg });

          avg_prev = curr_avg;
     }

     return r_avgs;
}

function GenerateDataset(size)
{
    var dataset = [];
    var dt1 = new Date(), dt2 = new Date();

    dt1.setDate(dt1.getDate() - 1);
    dt2.setDate(dt2.getDate() - size);

    var time_start = dt2.getTime();
    var time_diff = new Date().getTime() - dt1.getTime();

    let curr_time = time_start;
    for (let i = 0; i < size; i++, curr_time+=time_diff) {
       var curr_dt = new Date(curr_time);
       var hours = Math.floor(Math.random() * 100 % 24);
       var minutes = Math.floor(Math.random() * 100 % 60);
       var seconds = Math.floor(Math.random() * 100 % 60);
       dataset.push({ id: i + 1, price: (Math.floor(Math.random() * 10) + 5) + Math.random(),
   timestamp: curr_dt.getFullYear() + "-" + ((curr_dt.getMonth() > 9) ? curr_dt.getMonth() : ("0" + curr_dt.getMonth())) + "-" +
              ((curr_dt.getDate() > 9) ? curr_dt.getDate() : ("0" + curr_dt.getDate())) + " [" + ((hours > 9) ? hours : ("0" + hours)) +
  ":" + ((minutes > 9) ? minutes : ("0" + minutes)) + ":" + ((seconds > 9) ? seconds : ("0" + seconds)) + "]" });
    }

    return dataset;
}
