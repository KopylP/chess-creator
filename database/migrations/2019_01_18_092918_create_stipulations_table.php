<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStipulationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stipulations', function (Blueprint $table) {
            $table->increments('id');
            $table->string("stip", 10);
            // $table->primary("id");
            // $table->increments('id');
        });
        DB::table('stipulations')->insert(array('stip' => '#2'));
        DB::table('stipulations')->insert(array('stip' => '#3'));
        DB::table('stipulations')->insert(array('stip' => '#4'));
        DB::table('stipulations')->insert(array('stip' => 'h#2'));
        DB::table('stipulations')->insert(array('stip' => 'h#3'));
        DB::table('stipulations')->insert(array('stip' => 'h#'));
        DB::table('stipulations')->insert(array('stip' => 's#2'));
        DB::table('stipulations')->insert(array('stip' => 's#'));
        DB::table('stipulations')->insert(array('stip' => 'hs#'));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stipulations');
    }
}
