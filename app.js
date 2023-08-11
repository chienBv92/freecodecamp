document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {
      const dataset = data.data;
  
      // Kích thước của biểu đồ
      const w = 1200;
      const h = 500;
      const padding = 40;
  
      // Ánh xạ thời gian và giá trị
      const xScale = d3.scaleTime()
                       .domain([new Date("1947-07-01"), new Date("2015-07-01")])
                       .range([padding, w - padding]);
  
      const yScale = d3.scaleLinear()
                       .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
                       .range([h - padding, padding]);
  
      // Tạo svg
      const svg = d3.select(".visHolder")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
  
      // Vẽ các cột dọc
      svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("x", (d) => xScale(new Date(d[0])))
         .attr("y", (d) => yScale(d[1]))
         .attr("width", 3) // Độ rộng của cột
         .attr("height", (d) => h - yScale(d[1]) - padding)
         .attr("fill", "navy")
         .attr("class", "bar")
         .attr("data-date", (d) => d[0]) // Thêm thuộc tính data-date
         .attr("data-gdp", (d) => d[1]); // Thêm thuộc tính data-gdp
  
      // Tạo trục x và trục y
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
  
      // Thêm trục x và trục y vào biểu đồ
      svg.append("g")
         .attr("transform", "translate(0," + (h - padding) + ")")
         .call(xAxis);
  
      svg.append("g")
         .attr("transform", "translate(" + padding+ ", 0)")
         .call(yAxis);
    })
  });