laraImport("weaver.Query");
laraImport("lara.metrics.ExecutionTimeMetric");
laraImport("lara.metrics.EnergyMetric");
laraImport("lara.cmake.CMaker");


var metrics = [new ExecutionTimeMetric(), new EnergyMetric()];

for (const $pragma of Query.search("pragma", "matrix_loop")) {
    for (var metric of metrics) {
        metric.instrument($pragma.target);
    }
}

// Website version does not support the LARA code from this point on
/*
 var cmaker = new CMaker("test", false);
 cmaker.addCurrentAst()
 .addCFlags("-O2")
 .addLibs("-lm", "-pthread");

 var exe = cmaker.build();

 var executor = new ProcessExecutor();
 executor.setPrintToConsole(false);
 executor.execute([exe.getAbsolutePath()]);

 for (var metric of metrics) {
 var metricResult = metric.report(executor);
 println(metricResult.getValue() + metricResult.getUnit());
 }
 */
