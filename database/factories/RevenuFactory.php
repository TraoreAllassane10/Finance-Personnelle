<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Revenus>
 */
class RevenuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "date" => $this->faker->date('Y-m-d', 'now'),
            "Montant" => rand(50000, 10000000),
            "description" => $this->faker->sentence,
            'category_id' => 1,
            'user_id' => 1
        ];
    }
}
