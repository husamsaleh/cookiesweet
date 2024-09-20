<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Schedule daily database backups using mysqldump or a preferred method
        $schedule->exec('mysqldump -u your_username -p your_database > /path_to_backup/backup_$(date +\%F).sql')
                 ->daily()
                 ->onSuccess(function () {
                     \Log::info('Daily database backup completed successfully.');
                 })
                 ->onFailure(function () {
                     \Log::error('Daily database backup failed.');
                 });

        // Other scheduled tasks...
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
