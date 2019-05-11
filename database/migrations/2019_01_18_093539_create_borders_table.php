<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBordersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('borders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("author", 100);
            $table->string("code", 70);
            $table->string("problem_information", 15);
            $table->integer("stipulation_id")->unsigned();
            $table->foreign("stipulation_id")
            ->references('id')
            ->on('stipulations');
            $table->text("solution")->nullable(true);
            $table->text("another_information")->nullable(true);
            $table->integer("user_id")->unsigned()->nullable(true);
            $table->foreign("user_id")
            ->references('id')
            ->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('borders');
    }
}
