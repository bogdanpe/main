Console.WriteLine("Hello, Summative 5!");


//The error in the code is in the while loop's increment statement. Instead of decreasing the count variable by 2 (count -= 2), it should be increased by 2 (count += 2) to fill every other position in the array. The corrected code should look like this:

using System;

class Program
{
    static void Main()
    {
        int[] intArray = new int[10];
        int count = 0;

        while (count < 10)
        {
            intArray[count] = 5;
            count += 2; // Corrected to increment by 2
        }

        // Print the array to verify the values
        Console.WriteLine("Array contents:");
        foreach (int value in intArray)
        {
            Console.Write(value + " ");
        }
    }
}


//bishbashbosh
using System;

class Program
{
    static bool IsOddSum(int num)
    {
        int sum = 0;
        foreach (char digit in num.ToString())
        {
            sum += int.Parse(digit.ToString());
        }
        return sum % 2 != 0;
    }

    static int BishBashBOSHGame(int start, int end)
    {
        int bishBashBoshCount = 0;

        for (int num = start; num <= end; num++)
        {
            string output = "";

            if (num % 3 == 0)
            {
                output += "Bish";
            }

            if (num % 5 == 0)
            {
                output += "Bash";
            }

            if (IsOddSum(num))
            {
                output += "BOSH";
            }

            if (!string.IsNullOrEmpty(output))
            {
                Console.WriteLine(output);
                bishBashBoshCount++;
            }
        }

        return bishBashBoshCount;
    }

    static void Main()
    {
        int startRange = 0;
        int endRange = 100; // You can adjust the end range as needed
        int result = BishBashBOSHGame(startRange, endRange);

        Console.WriteLine($"\nNumber of times 'BishBashBOSH' is displayed: {result}");
    }
}

//reads characters from a given string, parses them into integers, and adds them to a sum variable until there are no more characters in the string:
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Enter a string of characters (press Enter to finish):");
        string inputString = Console.ReadLine();

        int sum = 0;

        foreach (char character in inputString)
        {
            if (char.IsDigit(character)) // Check if the character is a digit
            {
                int digit = int.Parse(character.ToString());
                sum += digit;
            }
        }

        Console.WriteLine($"Sum of the digits in the given string: {sum}");
    }
}

//software that calculates the average (median) of the array of sorted numbers (integers) below and submit the average (median) your software calculates as your answer.
//The median is the middle value. If there are an even number of values, the middle two values are added together and divided by two.

using System;

class Program
{
    static void Main()
    {
        int[] values = new int[] { 1, 2, 3, 4, 5 };

        double median = CalculateMedian(values);

        Console.WriteLine($"The median of the array is: {median}");
    }

    static double CalculateMedian(int[] sortedArray)
    {
        int length = sortedArray.Length;

        if (length % 2 == 0)
        {
            // If the array has an even length, calculate the average of the middle two values
            int middleIndex1 = length / 2 - 1;
            int middleIndex2 = length / 2;

            double median = (sortedArray[middleIndex1] + sortedArray[middleIndex2]) / 2.0;
            return median;
        }
        else
        {
            // If the array has an odd length, return the middle value
            int middleIndex = length / 2;
            return sortedArray[middleIndex];
        }
    }
}

//program that reads a file containing information about dog owners and their dogs, and then finds the number of owners with a name starting with "B" who have less than 3 dogs:

using System;
using System.IO;
using System.Linq;

class Program
{
    static void Main()
    {
        string filePath = "owners.txt"; // Replace with the actual file path

        try
        {
            int ownersCount = CountOwnersWithFewDogs(filePath, 'B', 3);
            Console.WriteLine($"Number of owners with a name starting with 'B' and less than 3 dogs: {ownersCount}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    static int CountOwnersWithFewDogs(string filePath, char startsWithChar, int maxDogs)
    {
        int count = 0;

        string[] lines = File.ReadAllLines(filePath);

        foreach (string line in lines)
        {
            string[] parts = line.Split(':');

            // Check if the owner's name starts with 'B'
            if (parts.Length > 1 && parts[0].TrimStart().StartsWith(startsWithChar.ToString()))
            {
                // Count the number of dogs for the owner
                int dogsCount = parts[1].Split(',').Length;

                // Check if the owner has less than maxDogs
                if (dogsCount < maxDogs)
                {
                    count++;
                }
            }
        }

        return count;
    }
}

//or
using System;
using System.IO;
using System.Linq;

class Program
{
    static void Main()
    {
        string filePath = "owners.txt"; // Replace with the actual file path

        try
        {
            int ownersCount = CountOwners(filePath, 'B', 3);
            Console.WriteLine($"Number of owners with a name starting with 'B' and less than 3 dogs: {ownersCount}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    static int CountOwners(string filePath, char startsWithChar, int maxDogs)
    {
        return File.ReadAllLines(filePath)
            .Select(line => line.Split(':'))
            .Where(parts => parts.Length > 1 && parts[0].TrimStart().StartsWith(startsWithChar.ToString()))
            .Count(parts => parts[1].Split(',').Length < maxDogs);
    }
}

