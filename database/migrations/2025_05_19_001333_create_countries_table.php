<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('countries', function(Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->string('name');
            $table->string('iso3');
            $table->string('iso2');
            $table->string('numeric_code');
            $table->string('phonecode');
            $table->string('capital')->nullable();
            $table->string('currency')->nullable();
            $table->string('currency_name')->nullable();
            $table->string('currency_symbol')->nullable();
            $table->string('tld')->nullable();
            $table->string('native')->nullable();
            $table->string('region')->nullable();
            $table->unsignedBigInteger('region_id')->nullable();
            $table->string('subregion')->nullable();
            $table->unsignedBigInteger('subregion_id')->nullable();
            $table->string('nationality')->nullable();
            $table->json('timezones')->nullable();
            $table->json('translations')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('emoji')->nullable();
            $table->string('emojiU')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('countries');
    }
};
