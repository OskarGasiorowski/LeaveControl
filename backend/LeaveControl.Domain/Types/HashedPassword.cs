using System.Security.Cryptography;

namespace LeaveControl.Domain.Types;

public readonly struct HashedPassword
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 10000;
    
    private readonly string _password;

    private HashedPassword(string password)
    {
        _password = password;
    }
    
    public static implicit operator string(HashedPassword password) => password.ToString();

    public static HashedPassword Create(Password password)
    {
        var salt = new byte[SaltSize];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        
        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
        var hash = pbkdf2.GetBytes(HashSize);
        
        var saltAndHash = new byte[SaltSize + HashSize];
        Array.Copy(salt, 0, saltAndHash, 0, SaltSize);
        Array.Copy(hash, 0, saltAndHash, SaltSize, HashSize);
        
        return new(Convert.ToBase64String(saltAndHash));
    }
    
    public bool Verify(Password password)
    {
        var saltAndHash = Convert.FromBase64String(_password);
        
        var salt = new byte[SaltSize];
        var storedHashBytes = new byte[HashSize];
        Array.Copy(saltAndHash, 0, salt, 0, SaltSize);
        Array.Copy(saltAndHash, SaltSize, storedHashBytes, 0, HashSize);
        
        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
        var testHash = pbkdf2.GetBytes(HashSize);
        
        for (var i = 0; i < HashSize; i++)
        {
            if (testHash[i] != storedHashBytes[i])
            {
                return false;
            }
        }

        return true;
    }

    public override string ToString()
    {
        return _password;
    }
}